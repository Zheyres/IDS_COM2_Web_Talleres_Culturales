const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const API_BASE_URL = 'http://10.194.129.134:3000/api';

const db = new Database('talleres_culturales.db');

// 1. Cargar y ejecutar el schema.sql que creaste
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schemaSql);

// 2. Verificar si la tabla ya tiene datos
const count = db.prepare('SELECT COUNT(*) as total FROM talleres').get().total;

if (count === 0) {
  // Insertamos explícitamente el registro inicial con ID 1
  const insertStmt = db.prepare(`
    INSERT INTO talleres (
      id, nombre, nombre_titular, descripcion, categoria, 
      lat, lng, direccion, telefono, website, email, status, horarios
    ) VALUES (
      1,
      'Cede Centro Cultural',
      'Juan Pérez',
      'Cede del centro cultural ofrece una variedad de talleres artísticos y culturales para todas las edades',
      'Todas',
      -34.60,
      -58.38,
      'Av. Siempre Viva 123',
      '123-444-xxxx',
      'https://www.cede.com.ar',
      'centro@cultural.com.ar',
      'active',
      'Sabados y Domingos 8 a 10'
    )
  `);

  insertStmt.run();
  console.log(" Base de datos inicializada: 'Cede Centro Cultural' insertado como ID 1.");
}