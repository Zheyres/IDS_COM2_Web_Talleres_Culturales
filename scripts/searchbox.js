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
  cargarMarcadores(resultado)
}
