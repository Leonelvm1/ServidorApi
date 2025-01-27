import { registrarGasto } from "./services/servicioGasto.js";

// Recoger los datos del formulario para gastos
let descripcionGasto = document.getElementById("descripcionGasto");
let categoriaGasto = document.getElementById("categoriaGasto");
let valorGasto = document.getElementById("valorGasto");
let fechaGasto = document.getElementById("fechaGasto");
let idUsuarioGasto = document.getElementById("idUsuarioGasto");

// Variable que asocia el botón con el formulario
let botonRegistrarGasto = document.getElementById("btnRegistrarGasto");

// Evento onclick para el registro de gasto
botonRegistrarGasto.addEventListener("click", function (evento) {
    evento.preventDefault();

    // Crear el objeto que será enviado al backend
    let objetoEnvioDatosGasto = {
        descripcion: descripcionGasto.value.trim(),
        categoria: categoriaGasto.value.trim(),
        valor: parseFloat(valorGasto.value),
        fecha: fechaGasto.value, // Fecha en formato ISO
        id_usuario: parseInt(idUsuarioGasto.value, 10),
    };

    console.log("Datos enviados al backend:", objetoEnvioDatosGasto);

    // Llamar a la función registrarGasto
    registrarGasto(objetoEnvioDatosGasto)
        .then(function (respuesta) {
            console.log("Gasto registrado:", respuesta);

            // Mostrar la alerta de éxito con SweetAlert
            Swal.fire({
                title: "¡Éxito!",
                text: "El gasto ha sido registrado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
        })
        .catch(function (error) {
            console.error("Error al registrar gasto:", error);

            // Mostrar alerta de error con SweetAlert
            Swal.fire({
                title: "¡Error!",
                text: "No se pudo registrar el gasto. Verifica los datos enviados.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        });
});
