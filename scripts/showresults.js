function mostrarTalleres(lista) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  lista.forEach(taller => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${taller.nombre}</h3>
      <p>${taller.descripcion}</p>
    `;

    div.addEventListener("click", () => {
      alert("Seleccionaste: " + taller.nombre);
      // acá podés hacer lo que quieras:
      // abrir detalle, guardar selección, etc
    });

    contenedor.appendChild(div);
  });
}