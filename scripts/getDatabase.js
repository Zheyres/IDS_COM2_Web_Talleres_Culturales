const API_BASE_URL = 'http://10.194.129.134:3000/api';
app.get(`${API_BASE_URL}/database`, (req, res) => {
  const { q, categoria } = req.query;

  // Siempre filtramos solo los talleres activos
  let sql = "SELECT * FROM talleres WHERE status = 'active'";
  const params = [];

  // Filtro de texto (nombre o descripción)
  if (q && q.trim() !== "") {
    sql += " AND (nombre LIKE ? OR descripcion LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  // Filtro de categoría
  if (categoria && categoria !== "" && categoria !== "Todas") {
    sql += " AND categoria = ?";
    params.push(categoria);
  }

  try {
    const stmt = db.prepare(sql);
    const talleres = stmt.all(...params); // Retorna los resultados de la consulta
    res.json(talleres);
  } catch (error) {
    console.error("Error en BD:", error);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});