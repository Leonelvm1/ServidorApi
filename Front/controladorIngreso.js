import { buscarIngresos, registrarIngreso } from "./services/servicioIngreso.js";

// Recoger los datos del formulario para ingresos
let descripcionIngreso = document.getElementById("descripcionIngreso");
let valorIngreso = document.getElementById("valorIngreso");
let fechaIngreso = document.getElementById("fechaIngreso");
let idUsuario = document.getElementById("id_usuario")

// Variable que asocia el botón con el formulario
let botonRegistrarIngreso = document.getElementById("btnRegistrarIngreso");

// Evento onclick para el registro de ingreso
botonRegistrarIngreso.addEventListener("click", function (evento) {
    evento.preventDefault();

    // Crear el objeto que será enviado al backend
    let objetoEnvioDatosIngreso = {
        descripcion: descripcionIngreso.value,
        valor: parseFloat(valorIngreso.value),
        fecha: fechaIngreso.value,
        id_usuario: idUsuario.value,
    };

    console.log(objetoEnvioDatosIngreso);

    // Llamar a la función registrarIngreso
    registrarIngreso(objetoEnvioDatosIngreso)
        .then(function (respuesta) {
            console.log("Ingreso registrado:", respuesta);

            // Mostrar la alerta de éxito con SweetAlert
            Swal.fire({
                title: "¡Éxito!",
                text: "El ingreso ha sido registrado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            // }).then(function () {
            //     // Crear un botón de redirección después de la alerta
            //     let botonRedireccion = document.createElement("a");
            //     botonRedireccion.href = "./ingresos.html"; // Redirigir a la página de ingresos
            //     botonRedireccion.classList.add("btn", "btn-primary", "mt-3"); // Estilo del botón
            //     botonRedireccion.textContent = "Ver ingresos"; // Texto del botón

            //     // Insertar el botón en el DOM
            //     let formContainer = document.getElementById("registerIngresoForm");
            //     formContainer.appendChild(botonRedireccion);
            // });
        })
        .catch(function (error) {
            console.error("Error al registrar ingreso:", error);

            // Mostrar alerta de error con SweetAlert
            Swal.fire({
                title: "¡Error!",
                text: "No se pudo registrar el ingreso.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        });
});
})

