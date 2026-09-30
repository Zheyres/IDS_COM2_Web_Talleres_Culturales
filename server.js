const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos dentro de la carpeta /database
const dbPath = path.join(__dirname, 'database', 'talleres.db');
const db = new Database(dbPath);

// 1. Inicializar la tabla desde database/schema.sql
try {
  const schemaPath = path.join(__dirname, 'database', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schemaSql);
  }
} catch (err) {
  console.error("Error al cargar schema.sql:", err.message);
}

// 2. Inicializar el Centro Cultural con ID 1 si la tabla está vacía
const count = db.prepare('SELECT COUNT(*) as total FROM talleres').get().total;

if (count === 0) {
  db.prepare(`
    INSERT INTO talleres (
      id, nombre, nombre_titular, descripcion, categoria, 
      lat, lng, direccion, telefono, website, email, status, horarios
    ) VALUES (
      1, 'Cede Centro Cultural', 'Juan Pérez',
      'Cede del centro cultural ofrece una variedad de talleres artísticos y culturales para todas las edades',
      'Todas', -34.60, -58.38, 'Av. Siempre Viva 123', '123-444-xxxx',
      'https://www.cede.com.ar', 'centro@cultural.com.ar', 'active', 'Sabados y Domingos 8 a 10'
    )
  `).run();
  console.log(" Base de datos creada e inicializada con Cede Centro Cultural (ID 1).");
}

// -------------------------------------------------------------
// ENDPOINTS
// -------------------------------------------------------------

// GET: Buscar y filtrar talleres (usado por searchbox.js / showresults.js)
app.get('/api/talleres', (req, res) => {
  const { q, categoria } = req.query;
  let sql = "SELECT * FROM talleres WHERE status = 'active'";
  const params = [];

  if (q && q.trim() !== "") {
    sql += " AND (nombre LIKE ? OR descripcion LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  if (categoria && categoria !== "" && categoria !== "Todas") {
    sql += " AND categoria = ?";
    params.push(categoria);
  }

  try {
    const stmt = db.prepare(sql);
    const talleres = stmt.all(...params);
    res.json(talleres);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta a la base de datos" });
  }
});

// POST: Registro de talleres nuevos (usado por register.js)
app.post('/api/talleres', (req, res) => {
  const {
    nombre, nombreTitular, descripcion, categoria,
    lat, lng, direccion, telefono, website, email, horarios
  } = req.body;

  const sql = `
    INSERT INTO talleres (
      nombre, nombre_titular, descripcion, categoria, 
      lat, lng, direccion, telefono, website, email, horarios
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const stmt = db.prepare(sql);
    const result = stmt.run(
      nombre, nombreTitular, descripcion, categoria,
      lat ? parseFloat(lat) : null,
      lng ? parseFloat(lng) : null,
      direccion, telefono, website, email, horarios
    );

    res.status(201).json({ message: "Taller registrado con éxito", id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar taller" });
  }
});

// Levantar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Node.js activo en http://localhost:${PORT}`);
});