// searchbox.js
async function filtrarTalleres() {
  const texto = document.getElementById("buscador").value.trim();
  const categoria = document.getElementById("filtroCategoria").value;

  const params = new URLSearchParams({
    q: texto,
    categoria: categoria
  });

  try {
    // Concatenamos API_BASE_URL + '/talleres'
    const response = await fetch(`${API_BASE_URL}/talleres?${params.toString()}`);
    const resultado = await response.json();

    mostrarTalleres(resultado);
    if (typeof cargarMarcadores === "function") {
      cargarMarcadores(resultado);
    }
  } catch (error) {
    console.error("Error al consultar la API:", error);
  }
}