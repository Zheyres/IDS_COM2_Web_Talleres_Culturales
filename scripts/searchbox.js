// URL base apuntando a tu servidor de Node.js / Express
const API_BASE_URL = 'http://10.194.129.134:3000/api'; 

// Ejemplo en la función de filtrado
async function filtrarTalleres() {
  const texto = document.getElementById("buscador").value.trim();
  const categoria = document.getElementById("filtroCategoria").value;
  const params = new URLSearchParams({ q: texto, categoria: categoria });

  const response = await fetch(`${API_BASE_URL}/talleres?${params.toString()}`);
  const resultado = await response.json();
  
  mostrarTalleres(resultado);
  cargarMarcadores(resultado);
}

// Ejemplo en el formulario de registro
async function registrarTaller(datosTaller) {
  const response = await fetch(`${API_BASE_URL}/talleres`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosTaller)
  });
  
  return await response.json();
}