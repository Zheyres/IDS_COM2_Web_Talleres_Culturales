let mapa;
let marcadores = [];

document.addEventListener("DOMContentLoaded", () => {

    mapa = L.map('mapa').setView([-34.521679, -58.701218],12) 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa)

    cargarMarcadores(talleres);
});

function cargarMarcadores(lista){

    marcadores.forEach (m => mapa.removeLayer(m.marcador));
    marcadores = [];

    lista.forEach (taller => {

        if (taller.status !== "active") return;

        const marcador = L.marker([taller.lat, taller.lng]).addTo(mapa);

        marcador.bindPopup(`<b>${taller.nombre}</b>`);

        marcador.on("click", () => {
            seleccionarTaller(taller,marcador);
        });

        marcadores.push({marcador,taller});
    });
}

function seleccionarTaller(taller, marcador){

    mapa.flyTo([taller.lat, taller.lng], 15, {
        duration: 1.5 });

    marcador.openPopup();

    mostrarDetalle(taller);

    resaltarEnLista(taller.id);

}

function mostrarDetalle(taller){

    const detalle = document.getElementById("detalle");

    detalle.innerHTML = `
    <h2>${taller.nombre}</h2> 
    <p><strong>Descripción:</strong> ${taller.descripcion}</p>
    <p><strong>Categoria:</strong> ${taller.categoria}</p>
    <p><strong>Dirección:</strong> ${taller.direccion}</p> `;
}

function resaltarEnLista(id) {

    const elementos = document.querySelectorAll("#resultados div");

    elementos.forEach(div => {

        div.classList.remove("activo");
    });

    const seleccionado = document.querySelector(`#resultados div[data-id="${id}"]`);

    if(seleccionado) {
        seleccionado.classList.add("activo");
        seleccionado.scrollIntoView({ behavior: "smooth", block: "center"});
    }

}