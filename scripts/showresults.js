
function mostrarTalleres(lista) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  lista.forEach(taller => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${taller.nombre}</h3>
      <p>${taller.descripcion}</p>
      <span>${taller.categoria}</span>
    `;
    contenedor.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buscador").addEventListener("input", filtrarTalleres);
  document.getElementById("filtroCategoria").addEventListener("change", filtrarTalleres);

  mostrarTalleres(talleres);
});