
// DOCUMENTACION DE FUNCION --
export function alertSuccess(message, redirectUrl,type="success"){
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: true, // Mostrar botón de confirmación
        confirmButtonText: "Aceptar" // Texto del botón
    }).then((result) => {
        if (result.isConfirmed && redirectUrl != "") {
            window.location.href = redirectUrl; // Redirigir a la página especificada
        }
    });
}

// Un cuadro de diálogo de confirmación, con una función adjunta al botón "Confirmar"
export function alertConfirmationButton(options, onConfirmCallback) {
    Swal.fire({
        title: options.title || '¿Estás seguro?',
        html: options.html || options.text || 'Esta acción no se puede deshacer.',
        icon: options.icon || 'warning',
        showCancelButton: true,
        confirmButtonText: options.confirmButtonText || 'Sí, proceder',
        cancelButtonText: options.cancelButtonText || 'Cancelar',
        confirmButtonColor: options.confirmButtonColor || '#3085d6',
        cancelButtonColor: options.cancelButtonColor || '#d33'
    }).then((result) => {
        if (result.isConfirmed && typeof onConfirmCallback === 'function') {
            onConfirmCallback(); // Ejecuta el callback si el usuario confirma
        } else {
            Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
        }
    });
}

export async function alertConfirmationButtonAsincrono(options, onConfirmCallback) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: options.title || '¿Estás seguro?',
            html: options.html || options.text || 'Esta acción no se puede deshacer.',
            icon: options.icon || 'warning',
            showCancelButton: true,
            confirmButtonText: options.confirmButtonText || 'Sí, proceder',
            cancelButtonText: options.cancelButtonText || 'Cancelar',
            confirmButtonColor: options.confirmButtonColor || '#3085d6',
            cancelButtonColor: options.cancelButtonColor || '#d33'
        }).then(async (result) => {
            if (result.isConfirmed && typeof onConfirmCallback === 'function') {
                await onConfirmCallback(); // Espera que termine
                resolve(); // Indica que la confirmación terminó
            } else {
                Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
                reject(); // Cancela la promesa
            }
        });
    });
}

//Funcion general para cualquier situación
export function alertGeneral(title, message,type){
    Swal.fire({
        icon: type,
        title: title,
        text:message,
        showConfirmButton: true, // Mostrar botón de confirmación
        confirmButtonText: "Aceptar" // Texto del botón
    });
}
//Alerta de respuesta para data actualizada
// Toma un mensaje que muestra error del backend
export function alertDataActualizada(type = "success", redirectUrl = '#', mensaje = "") {
    let iconType = type === "success" ? "success" : "error";
    let titleText = type === "success" ? "\u00A1Todo un \u00E9xito!" : "Ups, hubo un error en la solicitud";
    let messageText = type === "success"
        ? mensaje + " Los datos se han actualizado perfectamente."
        : " No se pudieron actualizar los datos. \u00BFPodr\u00EDas intentar de nuevo, por favor?" + mensaje;

    Swal.fire({
        icon: iconType,
        title: titleText,
        text: messageText
    }).then((result) => {
        if (result.isConfirmed && redirectUrl !== "#") {
            window.location.href = redirectUrl; // Redirect if needed
        }
    });
}

// Muestra errores faltantes en el formulario
export function alertDataFaltante(errores){
    Swal.fire({
        icon: "error",
        title: "Hay algunos errores en el formulario.",
        html: errores.join("<br>"), // Muestra todos los errores en líneas separadas
    });
}


// No te olvides de cerrarlo
export function alertEspera() {
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espera mientras se actualizan los datos.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Show loading spinner
        },
    });
}

// Error cuando usuario le faltan  datos
export class UserError extends Error {
    constructor(message, errors =[]) {
        super(message);  // Call the parent constructor with the message
        this.name = 'UserError';  // Set the name of the error
        this.stack = (new Error()).stack;  // Capture the stack trace
        this.errors = errors;
    }
}