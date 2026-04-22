function mostrarTalleres(lista) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  lista.forEach(taller => {
    const div = document.createElement("div");

    div.setAttribute("data-id",taller.id);

    div.innerHTML = `
      <h3>${taller.nombre}</h3>
      <p>${taller.descripcion}</p>
      <span>${taller.categoria}</span>
      <p>${taller.horarios}</p>
    `;


    div.addEventListener("click", () => {

      const seleccionado = marcadores.find(m => m.taller.id === taller.id);
      
      if (seleccionado){
        seleccionarTaller(seleccionado.taller, seleccionado.marcador)
      }
    
    })

    contenedor.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buscador").addEventListener("input", filtrarTalleres);
  document.getElementById("filtroCategoria").addEventListener("change", filtrarTalleres);

  filtrarTalleres();
});
