document.addEventListener("DOMContentLoaded", () => {
  // Inputs del Formulario
  const inputNombre = document.getElementById("nombre");
  const inputTitular = document.getElementById("titular");
  const inputDescripcion = document.getElementById("descripcion");
  const inputDireccion = document.getElementById("direccion");
  const chkMismaDireccion = document.getElementById("mismaDireccion");
  const inputTelefono = document.getElementById("telefono");
  const inputWebsite = document.getElementById("website");
  const inputEmail = document.getElementById("email");
  const inputHorarios = document.getElementById("horarios");
  const selectCategoria = document.getElementById("categoria");
  
  const btnImagen = document.getElementById("btnImagen");
  const imagenInput = document.getElementById("imagenInput");
  const nombreArchivo = document.getElementById("nombreArchivo");

  // Elementos de la Card Preview
  const prevNombre = document.getElementById("prevNombre");
  const prevTitular = document.getElementById("prevTitular");
  const prevDescripcion = document.getElementById("prevDescripcion");
  const prevCategoria = document.getElementById("prevCategoria");
  const prevDireccion = document.getElementById("prevDireccion");
  const prevTelefono = document.getElementById("prevTelefono");
  const prevWebsite = document.getElementById("prevWebsite");
  const prevEmail = document.getElementById("prevEmail");
  const prevHorarios = document.getElementById("prevHorarios");
  
  const prevImg = document.getElementById("prevImg");
  const prevImgPlaceholder = document.getElementById("prevImgPlaceholder");

  // Update dinamico de la Card Preview
  function actualizarPreview() {
    prevNombre.innerText = inputNombre.value || "Nombre del Taller";
    prevTitular.innerText = inputTitular.value || "-";
    prevDescripcion.innerText = inputDescripcion.value || "-";
    prevCategoria.innerText = selectCategoria.value;
    prevTelefono.innerText = inputTelefono.value || "-";
    prevHorarios.innerText = inputHorarios.value || "-";

    // Manejo de Dirección y Sede Central
    if (chkMismaDireccion.checked) {
      prevDireccion.innerHTML = "Sede Central del Centro Cultural (Av. Siempre Viva 123)";
    } else {
      prevDireccion.innerText = inputDireccion.value || "-";
    }

    // Manejo del Link de Website
    if (inputWebsite.value) {
      prevWebsite.href = inputWebsite.value;
      prevWebsite.innerText = inputWebsite.value;
    } else {
      prevWebsite.href = "#";
      prevWebsite.innerText = "-";
    }

    // Manejo del Link de Email
    if (inputEmail.value) {
      prevEmail.href = `mailto:${inputEmail.value}`;
      prevEmail.innerText = inputEmail.value;
    } else {
      prevEmail.href = "#";
      prevEmail.innerText = "-";
    }
  }

  // LISTENERS DE INPUT EN TIEMPO REAL
  const inputs = [inputNombre, inputTitular, inputDescripcion, inputDireccion, inputTelefono, inputWebsite, inputEmail, inputHorarios];
  inputs.forEach(element => element.addEventListener("input", actualizarPreview));
  selectCategoria.addEventListener("change", actualizarPreview);

  // Comportamiento Checkbox Sede Principal
  chkMismaDireccion.addEventListener("change", () => {
    if (chkMismaDireccion.checked) {
      inputDireccion.value = "Av. Siempre Viva 123";
      inputDireccion.disabled = true;
    } else {
      inputDireccion.value = "";
      inputDireccion.disabled = false;
    }
    actualizarPreview();
  });

  // Preview Imagen
  btnImagen.addEventListener("click", () => imagenInput.click());

  imagenInput.addEventListener("change", () => {
    const file = imagenInput.files[0];
    if (file) {
      nombreArchivo.innerText = `Archivo: ${file.name}`;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        prevImg.src = e.target.result;
        prevImg.style.display = "inline-block";
        prevImgPlaceholder.style.display = "none";
      }
      reader.readAsDataURL(file);
    } else {
      nombreArchivo.innerText = "";
      prevImg.src = "";
      prevImg.style.display = "none";
      prevImgPlaceholder.style.display = "block";
    }
  });

  // Ejecución inicial por defecto
  actualizarPreview();
});