function filtrarTalleres() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const categoria = document.getElementById("filtroCategoria").value;

  const resultado = talleres.filter(taller => {

    const coincideTexto =
      taller.nombre.toLowerCase().includes(texto) ||
      taller.descripcion.toLowerCase().includes(texto);

    const coincideCategoria =
      categoria === "" || taller.categoria === categoria;
    
      
    const estaActivo = taller.status === "active";
      return coincideTexto && coincideCategoria && estaActivo;
  });

  mostrarTalleres(resultado);
}
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

  filtrarTalleres(); // 👈 en vez de mostrarTalleres(talleres)
});