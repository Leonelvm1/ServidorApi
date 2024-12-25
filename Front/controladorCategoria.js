import { registrarCategoria } from "./services/servicioCategoria.js";

// Recoger los datos del formulario para categorías
let nombreCategoria = document.getElementById("nombreCategoria");
let descripcionCategoria = document.getElementById("descripcionCategoria");
let valorCategoria = document.getElementById("valorCategoria");
let fechaCategoria = document.getElementById("fechaCategoria");
let id_usuarioCategoria =document.getElementById("id_usuarioCategoria");

// Variable que asocia el botón con el formulario
let botonRegistrarCategoria = document.getElementById("btnRegistrarCategoria");

// Evento onclick para el registro de categoría
botonRegistrarCategoria.addEventListener("click", function (evento) {
    evento.preventDefault();

    // Crear el objeto que será enviado al backend
    let objetoEnvioDatosCategoria = {
        nombre: nombreCategoria.value.trim(),
        descripcion: descripcionCategoria.value.trim(),
        valor: parseFloat(valorCategoria.value),
        fecha: fechaCategoria.value,
        id_usuario: id_usuarioCategoria.value
    };

    console.log("Datos enviados al backend:", objetoEnvioDatosCategoria);

    // Llamar a la función registrarCategoria
    registrarCategoria(objetoEnvioDatosCategoria)
        .then(function (respuesta) {
            console.log("Categoría registrada:", respuesta);

            // Mostrar la alerta de éxito con SweetAlert
            Swal.fire({
                title: "¡Éxito!",
                text: "La categoría ha sido registrada correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
        })
        .catch(function (error) {
            console.error("Error al registrar categoría:", error);

            // Mostrar alerta de error con SweetAlert
            Swal.fire({
                title: "¡Error!",
                text: "No se pudo registrar la categoría. Verifica los datos enviados.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        });
});
