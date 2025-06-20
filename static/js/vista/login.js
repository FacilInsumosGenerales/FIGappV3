import {alertGeneral } from "../utils/alert_utils.js";


// Espera a que el documento esté completamente cargado y listo antes de ejecutar cualquier código
$(document).ready(function(){ 

    // Obtiene referencias a los elementos del DOM (Document Object Model) con los IDs especificados
    const usuario = document.getElementById("txt_usuario"); // Campo de entrada para el nombre de usuario
    const password = document.getElementById("txt_password"); // Campo de entrada para la contraseña
    const btnIniciarSesion = document.getElementById("btnIniciarSesion"); // Botón de inicio de sesión

    // Define un objeto JSON que contiene la estructura y los valores necesarios para realizar una consulta en la base de datos
    const jsonUsuario = {
        "nombreTabla": "usuarios",	// Nombre de la tabla en la base de datos
        "informacionColumnas": {     // Columnas de la tabla a recuperar
            "Usuario":null,
            "Password":null,
            "TRAZA": null,             // Columna adicional (se podría usar para rastreo o auditoría)
        },
        "tablaJoins": [              // Sección para unir otras tablas si es necesario (vacía en este caso)
        ],
        "datosFiltro": [             // Filtros para la consulta, basados en el usuario y contraseña ingresados
            {
                "tabla": "usuarios", 
                "columna": "Password", // Filtra por la columna de contraseña
                "operacion": "=",
                "comparador": null,      // Se completará con el valor de la contraseña ingresada
                "siguienteOperacion": "AND"  // Indica que debe combinarse con el siguiente filtro usando "AND"
            },
            {
                "tabla": "usuarios",
                "columna": "Usuario",  // Filtra por la columna de usuario
                "operacion": "=",
                "comparador": null,      // Se completará con el valor del usuario ingresado
                "siguienteOperacion": null     // No hay operación adicional después de este filtro
            }
        ],
        "orderby": []                 // Ordenamiento para los resultados (vacío en este caso)
    };

    // Agrega un listener al botón de inicio de sesión para que ejecute la función de login cuando se haga clic en él
    btnIniciarSesion.addEventListener("click", function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del botón (como enviar un formulario)
        login(); // Llama a la función login para manejar el inicio de sesión
    });

    // Función que maneja el proceso de inicio de sesión
    function login(){

        // Verifica si los campos de usuario o contraseña están vacíos
        if (usuario.value == "" || password.value == "" ){
            Swal.fire({ // Muestra una alerta usando SweetAlert si algún campo está vacío
                icon: "error",
                title: "Campo usuario o clave no ingresado", // Mensaje de error
            });
            return ; // Sale de la función login para evitar continuar con el proceso
        }

        // Actualiza el objeto jsonUsuario con los valores ingresados por el usuario
        jsonUsuario.datosFiltro[1].comparador = usuario.value; // Asigna el valor ingresado al filtro de usuario
        jsonUsuario.datosFiltro[0].comparador = password.value; // Asigna el valor ingresado al filtro de contraseña

        console.log(jsonUsuario); // Muestra el objeto jsonUsuario en la consola para depuración

        // Crea un objeto FormData para enviar los datos al servidor
        var formData = new FormData();
        const params = new URLSearchParams();

        // Agrega el objeto JSON a formData como un campo llamado 'data'
        formData.append('data', JSON.stringify(jsonUsuario));

        // Convierte formData en parámetros de URL
        formData.forEach((value, key) => {
            params.append(key, value);
            
        });
        params.append('_', new Date().getTime());
        // Define la URL para hacer la petición GET, incluyendo los parámetros formateados
        const url = `../backend/tabla.php?${params.toString()}`;

        // Realiza una petición GET al servidor para autenticar al usuario
        fetch(url, {  
            method: 'GET' // Usa el método GET para la solicitud
        })
        .then(response => response.json()) // Convierte la respuesta en un objeto JSON
        .then(response => { // Maneja la respuesta del servidor
            if(response.success){ // Si la respuesta indica éxito (usuario autenticado)
                const usuario = response.data.Nombre + " " + response.data.Apellido; // Construye el nombre completo del usuario
                console.log(response);
                localStorage.setItem("user", usuario); // Almacena el nombre del usuario en localStorage
                localStorage.setItem("last_activity", Date.now()); // Almacena el tiempo de inicio de sesión en localStorage

                // Muestra un mensaje de éxito y redirige al usuario a la página principal si confirman
                alertGeneral("Se ingresó con éxito",
                    "¡Gracias por ser parte de este maravilloso equipo!",
                    "Inicio.html",
                    "success");
            } else {
                // Si la autenticación falla, muestra un mensaje de error
                Swal.fire({
                    title: response.message,
                    icon: "error"
                });
            }
        })
        .catch((error) => {
            // Maneja cualquier error que ocurra durante la solicitud
            console.error('Error:', error); // Muestra el error en la consola
        });
    }

});
