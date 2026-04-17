//para que cargue el DOM antes de ejecutar el código, sino se rompia//
document.addEventListener("DOMContentLoaded", () => {

  //  BOTÓN REGISTRAR 
  const btnRegistrar = document.getElementById("btnRegistrar");
  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", () => {
      window.location.href = "../Pages/register.html";
    });
  }

  //  DIRECCIÓN
  const checkbox = document.getElementById("mismaDireccion");
  const direccionInput = document.getElementById("direccion");

  if (checkbox && direccionInput) {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        direccionInput.disabled = true;
        direccionInput.removeAttribute("required");
        direccionInput.value = "Centro cultural";
      } else {
        direccionInput.disabled = false;
        direccionInput.setAttribute("required", true);
      }
    });
  }

  //  IMAGEN
  const inputImagen = document.getElementById("imagenInput");
  const preview = document.getElementById("previewImagen");
  const nombre = document.getElementById("nombreArchivo");
  const btnImagen = document.getElementById("btnImagen");

  if (btnImagen && inputImagen) {
    btnImagen.addEventListener("click", () => {
      inputImagen.click();
    });
  }

  if (inputImagen && preview && nombre) {
    inputImagen.addEventListener("change", () => {
      const file = inputImagen.files[0];

      if (file) {
        nombre.textContent = file.name;

        const reader = new FileReader();

        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = "block";
        };

        reader.readAsDataURL(file);
      }
    });
  }

});