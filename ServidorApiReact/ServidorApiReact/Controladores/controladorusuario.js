import { buscarUsuario, registrarUsuario } from "./services/serviciosUsuario.js"

//Recoger los datos del form usando JS para el formulario usuario
let nombreUsuario = document.getElementById("nombresUsuario")
let fechaNacimientoUsuario = document.getElementById("fechaNacimiento")
let ubicacionUsuario = document.getElementById("ubicacionUsuario")
let metaAhorroUsuario = document.getElementById("metaAhorroUsuario")
let contrasena = document.getElementById("contrasena")

// variable que asocia el boton con el form
let botonRegistroUsuario = document.getElementById("btnRegistrarUsuario")

// Evento onclick corregido para el registro de usuario
botonRegistroUsuario.addEventListener("click", function(evento) {
    evento.preventDefault();

    // Ajusta los nombres de los campos para que coincidan con lo que espera el backend
    let objetoEnvioDatosUsuario = {
        nombres: nombreUsuario.value,
        fechaNacimiento: fechaNacimientoUsuario.value,
        ubicacion: ubicacionUsuario.value,
        metaAhorro: parseFloat(metaAhorroUsuario.value),
        contrasena: contrasena.value  // Convertir a número flotante
    };

    console.log(objetoEnvioDatosUsuario);

    // Llamar a la función registrarUsuario y pasarle los datos
    registrarUsuario(objetoEnvioDatosUsuario)
    .then(function (respuesta) {
        console.log("Usuario registrado:", respuesta);
        
        // Mostrar la alerta de éxito con SweetAlert
        Swal.fire({
            title: "¡Éxito!",
            text: "El usuario ha sido registrado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(function() {
            // Crear el botón de redirección después de la alerta
            let botonRedireccion = document.createElement("a");
            botonRedireccion.href = "./usuarios.html";  // Aquí rediriges a la página de usuarios
            botonRedireccion.classList.add("btn", "btn-primary", "mt-3");  // Aplica el mismo estilo del formulario
            botonRedireccion.textContent = "Ver usuarios";  // Texto del botón

            // Insertar el botón en el DOM (lo puedes agregar debajo del formulario)
            let formContainer = document.getElementById("registerForm");
            formContainer.appendChild(botonRedireccion);
        });
    })
    .catch(function (error) {
        console.log("Error al registrar usuario:", error);
        Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al registrar el usuario.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    });

});

let botonLogin = document.getElementById("btnLogin");

botonLogin.addEventListener("click", function () {
    // Capturar los valores de los campos de usuario y contraseña
    let usuario = document.getElementById("usuario").value.trim();
    let contrasena = document.getElementById("passwordusuario").value.trim();

    // Validar que los campos no estén vacíos
    if (usuario === "" || contrasena === "") {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor completa todos los campos.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    // Llamar a la función para buscar usuarios
    buscarUsuario().then(function (usuarios) {
        console.log("Usuarios obtenidos:", usuarios); // Verifica el contenido

        let usuarioEncontrado = usuarios.find(
            (user) =>
                user.nombres === usuario && user.contrasena === contrasena
        );

        if (usuarioEncontrado) {
            // Inicio de sesión exitoso, mostrar botones dinámicos
            Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                text: "Selecciona una opción para continuar.",
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then(function () {
                // Crear contenedor para los botones si no existe
                let contenedorOpciones = document.getElementById("opciones");
                if (!contenedorOpciones) {
                    contenedorOpciones = document.createElement("div");
                    contenedorOpciones.id = "opciones";
                    contenedorOpciones.classList.add("mt-3", "d-flex", "justify-content-center", "gap-3");
                    document.body.appendChild(contenedorOpciones);
                }

                // Limpiar botones previos si existen
                contenedorOpciones.innerHTML = "";

                // Crear botón "Usuarios"
                let botonUsuarios = document.createElement("a");
                botonUsuarios.href = "./usuarios.html";
                botonUsuarios.classList.add("btn", "btn-primary", "mr-1");
                botonUsuarios.textContent = "Usuarios";

                // Crear botón "Formularios"
                let botonFormularios = document.createElement("a");
                botonFormularios.href = "./forms.html";
                botonFormularios.classList.add("btn", "btn-success", "ml-1");
                botonFormularios.textContent = "Formularios";

                // Agregar los botones al contenedor
                contenedorOpciones.appendChild(botonUsuarios);
                contenedorOpciones.appendChild(botonFormularios);
            });
        } else {
            // Mostrar mensaje de error
            Swal.fire({
                title: "¡Error!",
                text: "Usuario o contraseña incorrectos.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    });
});
