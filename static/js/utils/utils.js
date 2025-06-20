import { config } from "../../../config.js";
import { alertDataActualizada, alertDataFaltante, alertEspera, UserError } from "./alert_utils.js";
import { formatearFechaComoYYMMDD } from "./date_utils.js";

export function generarNombreUnico(extension = "") {
    // Definir los caracteres que se pueden usar (letras y números)
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Inicializar el nombre único
    let nombreUnico = '';

    // Generar 6 caracteres aleatorios
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        nombreUnico += caracteres.charAt(randomIndex);
    }

    // Añadir los últimos 4 dígitos del timestamp actual (milisegundos)
    const timestamp = Date.now().toString().slice(-4);

    // Combinar con los caracteres aleatorios
    nombreUnico += timestamp;

    // Si se proporciona una extensión, la añadimos
    if (extension) {
        nombreUnico += "." + extension;
    }

    return nombreUnico;
}

/**
 * manejarSeleccionFila
 * 
 * Función que se encarga de ejecutar una funcion cuando seleccionas una fila de una tabla
 * tambien cuando deselecciona una fila de la tabla
 * De manera opcional dar la posibilidad de colocar campos de la fila seleccionada 
 * en un elemento
 * 
 * @param {element} tabla - Elemento tabulator
 * @param {element} elementoDestino - Elemento html donde se guarda el nombre de lo seleccionado
 * @param {object} campoTexto - Campo que se guarda en elemento destino
 * @param {function} callbackSelect - funcion que se aplica despues de seleccionar
 * @param {function} callbackDeselect - funcion que se aplica despues de deseleccionar
 */
export function manejarSeleccionFila(
    tabla, // elemento Tabulator
    elementosDestino = null, // lista de elementos
    campoTexto = null, // campo que se guarda en elemento destino (opcional)
    callbackSelect = null, // función que se aplica después de seleccionar
    callbackDeselect = null, // función que se aplica después de deseleccionar
    joinCharacters = ' ' // Como se concatenan los nombres
) {

    tabla.on("rowSelected", function(data) {

        // Conseguir data
        const row = data.getData();

        // Si se proporciona elementoDestino y campoTexto, actualiza el contenido

        if (elementosDestino && campoTexto) {
            let textoDestino = campoTexto.map(campo => row[campo]).join(joinCharacters);
        
            // Actualiza el textContent de cada elemento en la lista
            if (Array.isArray(elementosDestino)) {
                elementosDestino.forEach(elemento => {
                    elemento.textContent = textoDestino || "Campo no encontrado";
                });
            }
        }


        // Si se ha pasado una función callbackSelect, ejecutarla
        if (callbackSelect && typeof callbackSelect === 'function') {
            callbackSelect(row);
        }
    });

    tabla.on("rowDeselected", function(data) {
        const row = data.getData();
        // Si se proporciona elementoDestino, actualizar texto
        if (elementosDestino && Array.isArray(elementosDestino)) {

            elementosDestino.forEach(elemento => {
                elemento.textContent = "No hay seleccionado";
            });
            
        }

        // Si se ha pasado una función callbackDeselect, ejecutarla
        if (callbackDeselect && typeof callbackDeselect === 'function') {
            callbackDeselect(row);
        }
        
    });

    // hacer no deseleccionable si selectRow es mayor a 1
    const options = tabla.options; // Options used to initialize the table
    if (options['selectableRows'] === 1) {
        tabla.on("rowClick", function (e, row) {
            row.select();
        });
    }
    
    
}

// nombre de estado = {nombreColumn : diccionario que se usa}
export function edicionesPut(json, rowData, booleans=[], nombresEstados = {}) {


    // Inicializar variables
    const fecha = formatearFechaComoYYMMDD(new Date(), true);
    const user = localStorage.getItem("user");
    let cambios = "";

    // Iterar a través de cada clave en json.informacionColumnas
    for (const key in json.informacionColumnas) {
        if (key != 'Ediciones'){
            var valorJson = json.informacionColumnas[key]; // Valor del JSON (nuevo)
            var valorFila = rowData[key]; // Valor de la fila seleccionada (actual)

            // Adjunto solo se carga si hay un nuevo archivo, si no se mantiene como antes
            if (valorJson !== "" && (key === 'Adjunto' || key === 'Adjuntos') || key === 'OC_Cliente_PDF') {
                valorJson=valorFila;
            }
            if (booleans.includes(key)) {
                valorFila = valorFila === 'Si' ? 1 : 0;
            }

            let diccionarioEstados = nombresEstados[key];
            if (diccionarioEstados){
                valorJson =  diccionarioEstados[valorJson];
                valorFila = diccionarioEstados[valorFila];
            }
            // Comparar el valor del JSON con el valor de la fila
            if (valorJson !== valorFila && !(valorJson === "" && valorFila === null)) {
                
                // Si son diferentes, registrar el cambio en la cadena 'cambios'
                cambios += `;${fecha}, ${user}, cambió columna ${key} de *${valorFila}* a *${valorJson}*.`;

                // Agregar eliminaciones y creaciones
            }
        }
        
    }

    console.log('ediciones guardadas', );
    return cambios; // Retornar la cadena con los cambios
}

export function edicionesPost(item = 'un elemento'){
    //2021-01-01 00:00:00, Jose Díaz Zamora, se registró en el sistema una orden de compra
    const fecha = formatearFechaComoYYMMDD(new Date(),true);
    const user = localStorage.getItem("user");
    const accion = `Registró en el sistema ${item}.`;
    const edicion = `${fecha}, ${user} , ${accion}` ;
    return edicion; 
}



// Funcion para cambiar favorito
// component - elemento html que cambiar. Generalmente un boton
export function toggleFavorito(componente){
    var textoFavorito = componente.textContent;
        if (textoFavorito === "No") {
            componente.innerText = "Si";
        } else {
            componente.innerText = "No";
        }
}

// Funcion para cerrar un modal
 
/**
 * Función para limpiar los valores dentro de un modal.
 * 
 * @param {string} modalId - El ID del modal del cual se desean limpiar los valores.
 */
export function limpiarModal(modalId) {
    // Obtener el elemento del modal
    const modal = document.getElementById(modalId);

    // Seleccionar todos los campos de entrada y textareas dentro del modal
    const inputs = modal.querySelectorAll('input, textarea');

    // Limpiar los valores de cada campo de entrada y textarea
    inputs.forEach(input => {
        input.value = ""; // Limpiar el valor del campo de entrada
    });

    // Opcional: Reiniciar otros elementos, por ejemplo, campos de selección (select)
    const selects = modal.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Reiniciar el select a la primera opción
    });

    // Opcional: Reiniciar otros elementos, por ejemplo, casillas de verificación (checkboxes)
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Desmarcar todas las casillas de verificación
    });
}


/**
 * Procesa un archivo seleccionado desde un input de tipo file.
 * 
 * Esta función toma el primer archivo de un elemento de entrada de archivo 
 * (fileInput), obtiene su extensión, genera un nuevo nombre único para él 
 * y devuelve el archivo con el nuevo nombre manteniendo su tipo original.
 * 
 * @param {HTMLInputElement} fileInput - El elemento input de tipo file que contiene el archivo a procesar.
 * @returns {File} - Un nuevo archivo (File) con un nombre único y el mismo tipo de contenido que el original.
 */
export function procesarArchivo(fileInput) {

    // Obtiene el primer archivo del input
    const file = fileInput.files[0];

    // Obtener la extensión del archivo a partir de su nombre
    const extension = file.name.split('.').pop();

    // Generar un nombre único para el archivo manteniendo su extensión
    const nuevoNombre = generarNombreUnico(extension);

    // Crear un nuevo archivo con el contenido original, pero con el nombre único
    const nuevoArchivo = new File([file], nuevoNombre, { type: file.type });

    // Retorna el nuevo archivo creado
    return nuevoArchivo;
}

export function procesarArchivoTabulator(fileInput) {

    // Obtiene el primer archivo del input
    const file = fileInput;

    // Obtener la extensión del archivo a partir de su nombre
    const extension = file.name.split('.').pop();

    // Generar un nombre único para el archivo manteniendo su extensión
    const nuevoNombre = generarNombreUnico(extension);

    // Crear un nuevo archivo con el contenido original, pero con el nombre único
    const nuevoArchivo = new File([file], nuevoNombre, { type: file.type });

    // Retorna el nuevo archivo creado
    return nuevoArchivo;
}


/**
 * Executes an asynchronous operation and handles loading alerts, success,
 * and error messages.
 *
 * @param {Function} asyncOperation - The asynchronous operation to execute.
 *                                   This function should return a Promise.
 *                                   It can be any function that performs an
 *                                   async task (e.g., fetching data from an API).
 * 
 * @returns {Promise<void>} - A Promise that resolves when the operation
 *                            is completed and alerts are shown.
 *
 * @throws {Error} - If the async operation throws an error, it is caught
 *                   and an error alert is shown to the user.
 * 
 * @example
 * // Usage with an async function
 * await mostrarErroresCargarData(async () => {
 *     return await actualizarData(jsonPutDireccion, jsonGetDireccion, tblDireccion, true, 2);
 * });
 */
export async function mostrarErroresCargarData(asyncOperation) {
    alertEspera();
    try {
        // Call the function that might throw the enhanced error
        await asyncOperation();

        // Cerrar alerta
        Swal.close();
        alertDataActualizada("success");

    } catch (error) {

        Swal.close();

        // Si es un error de usuario
        if (error instanceof UserError) {
            // Mostrar errores
            alertDataFaltante(error.errors);
        } else {
            alertDataActualizada("error");
        }
        console.error(error);
        
    }
}

        // const fecha = convertirFechaISO((new Date()).toString());
        // const usuario = localStorage.getItem('user');
        // const pagina = window.location.pathname;

        //  // Crear el json para enviarlo al backend
        // var jsonPostLogError = {
        //     "nombreTabla": "usuarios",	
        //     "informacionColumnas": [],
        //     "tablaJoins": [],
        //     "datosFiltro": [],
        //     "orderby": [],
        //     "error": `[${fecha}] - [${usuario} - ${pagina}]: Error en ${error}`
        // };
        // // Enviar el error al archivo error_log
        // await guardarData(jsonPostLogError); 

export function transformarCodigo(codigo,cantcot) {
    // Eliminar el primer carácter y separar el año y el número
    const year = codigo.substring(1, 5); // "2024"
    const numero = codigo.substring(6); // "1090"
    
    // Extraer los últimos dos dígitos del año
    const yearUltimosDos = year.slice(-2); // "24"
    
    // Construir el nuevo código
    const nuevoCodigo = `C${yearUltimosDos}${numero}V${cantcot}`;
    
    return nuevoCodigo;
}

export function ObtenerEstadoCotizacion(estado) {
    // Segun al estado
    let r = "";
    switch (estado){
        case 0: r = "Generadas"; break;
        case 1: r = "Entregadas"; break;
        case 2: r = "Aceptadas"; break;
        case 3: r = "COmpletadas"; break;
        case 4: r = "Canceladas"; break;
        default: r = "Sin estado"; break;
    }
    return r;
}

export function ObtenerEstadoOCCliente(estado) {
    // Segun al estado
    let r = "";
    if(typeof(estado) === "string" ){
        estado = parseInt(estado);
    }
    switch (estado){
        case 0: r = "Registrado"; break;
        case 1: r = "En proceso de entrega"; break;
        case 2: r = "Stand By"; break;
        case 3: r = "Servicio post venta"; break;
        case 4: r = "Completado"; break;
        default: r = "Sin estado"; break;
    }
    return r;
}

export function ObtenerEstadoOCProveedor(estado) {
    // Segun al estado
    let r = "";
    switch (estado){
        case 0: r = "Registrado"; break;
        case 1: r = "Con abonos"; break;
        case 2: r = "En stand by"; break;
        case 3: r = "Con planes de entrega"; break;
        case 4: r = "Entregada al cliente"; break;
        case 5: r = "En devolucion"; break;
        default: r = "Sin estado"; break;
    }
    return r;
}

/**
 * Verifica si el archivo PDF existe y lo asigna al iframe. Si no existe, asigna una ruta alternativa.
 * 
 * @param {string} archivoRuta - Ruta del archivo PDF original.
 * @param {string} rutaAlternativa - Ruta alternativa si el archivo original no existe.
 * @param {HTMLElement} iframeElemento - Elemento iframe donde se asignará la ruta.
 */
export function cargarMedia(archivoRuta,iframeElemento, rutaAlternativa = "../static/templates/PDFvacio.pdf") {
    
    const extensionesValidas = [".pdf", ".png", ".jpg", ".jpeg"];

    // Verificar si el archivo es un PDF y si existe en el servidor
    if (archivoRuta && extensionesValidas.some(ext => archivoRuta.toLowerCase().endsWith(ext))) {
        // Usar fetch para validar si el archivo existe
        fetch(archivoRuta, { method: 'HEAD' }) // Solo obtener los headers para comprobar si existe
            .then(response => {
                if (response.ok) {
                    // Si el archivo existe, cargarlo en el iframe
                    iframeElemento.src = archivoRuta;
                } else {
                    // Si no existe, cargar la ruta alternativa
                    console.log("Archivo no encontrado. Cargando ruta alternativa...");
                    iframeElemento.src = rutaAlternativa;
                }
            })
            .catch(error => {
                // Si hay un error de red, cargar la ruta alternativa
                console.log("Error al acceder al archivo. Cargando ruta alternativa...", error);
                iframeElemento.src = rutaAlternativa;
            });
    } else {
        // Si no es un PDF, cargar la ruta alternativa
        console.log("El archivo no es un PDF. Cargando ruta alternativa...");
        iframeElemento.src = rutaAlternativa;
    }
}

// convierte numeros en strings
export function getStringValue(value) {
    return (value !== null && value !== undefined) ? String(value) : '';
}

/**
 * Verifica si el archivo PDF existe y lo asigna al iframe. Si no existe, asigna una ruta alternativa.
 * 
 * @param {string} fechaRegistro - Cadena de texto de la fecha formato: 2024-11-03 00:00:00
 * @param {string} diasValidez - Numero de dias que se sumaran a la Fecha_de_Registro
 * @param {HTMLElement} nuevaFecha - Nueva fecha es la fecha sumada de los dias de validez + Fecha_de_Registro.
 */
// Calcular Fecha de Validez
export function calcularFechaValidez(fechaRegistro, diasValidez) {
    // Asegurarnos de que diasValidez sea un número, conviértelo si es necesario
    diasValidez = Number(diasValidez);
    
    // Si diasValidez no es un número válido, emitir error y devolver null
    if (isNaN(diasValidez)) {
        console.error("Error: 'diasValidez' debe ser un número o un texto numérico.");
        return null;
    }

    // Dividir la fecha y la hora
    const [datePart, timePart] = fechaRegistro.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    // Crear el objeto de fecha
    let fecha = new Date(year, month - 1, day, hours, minutes, seconds);

    // Sumar los días de validez como milisegundos
    let nuevaFecha = new Date(fecha.getTime() + diasValidez * 24 * 60 * 60 * 1000);

    // Formatear la fecha resultante en el formato deseado
    const formattedFechaValidez = `${nuevaFecha.getFullYear()}-${String(nuevaFecha.getMonth() + 1).padStart(2, '0')}-${String(nuevaFecha.getDate()).padStart(2, '0')} ${String(nuevaFecha.getHours()).padStart(2, '0')}:${String(nuevaFecha.getMinutes()).padStart(2, '0')}:${String(nuevaFecha.getSeconds()).padStart(2, '0')}`;

    return formattedFechaValidez;
}

// Funcion para generar links
export function convertirCeldaALink(celda, enBD = false){
    
    var href = celda.getValue();

    if( href !== null && href !== undefined && href !==""){

        if (enBD){
            href = `../../../${config.storage_url}/${href}`;
    
        }
        
        return  `<a href='${href}' target='_blank'>${href}</a>`;
    } 
    else {
        return "";
    }
}


