CREATE TABLE IF NOT EXISTS talleres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    nombre_titular TEXT,
    descripcion TEXT,
    categoria TEXT,
    lat REAL,                   -- REAL para números decimales de geolocalización
    lng REAL,                   -- REAL para números decimales de geolocalización
    direccion TEXT,
    telefono TEXT,
    website TEXT,
    email TEXT,                 -- Normalizamos a minúscula para mantener buenas prácticas
    status TEXT DEFAULT 'active',
    horarios TEXT
);