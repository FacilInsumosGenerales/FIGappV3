//Formatea cualquier fecha y permitir devolver hora
export function formatearFechaComoYYMMDD(fecha,hora=false, anadir = 0) {

    if (typeof fecha === "string") {
        fecha = new Date(`${fecha}T00:00:00`);
    }

    // Añadir dias
    if (anadir !== 0){
        fecha.setDate(fecha.getDate() + anadir);
    }

    var anio = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');

    // Definir hora
    if(hora){
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');
        return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }

    // anadir dias
    return `${anio}-${mes}-${dia}`;
}



export function convertirFechaISO(fechaNoISO, hora = true) {
    const fecha = new Date(fechaNoISO);

    if (isNaN(fecha)) {
        console.warn("Fecha inválida: " + fechaNoISO );
        return fechaNoISO;
    }

    // Opciones de formato básicas para fecha
    const opcionesFecha = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    // Añadir opciones de hora si hora === true
    if (hora) {
        opcionesFecha.hour = 'numeric';
        opcionesFecha.minute = 'numeric';
        opcionesFecha.hour12 = true;
    }

    return fecha.toLocaleString('es-ES', opcionesFecha);
}

export function formatearFechaDependiendoDelDia(fecha){

    const fechaISO =convertirFechaISO(fecha);

    const hoy = new Date();
    const fechaLimpia = new Date(fecha.trim());
    const esHoy = hoy.toDateString() === fechaLimpia.toDateString();
    const fechaFormateada = esHoy? cambiarFechaAHoy(fechaISO) : fechaISO;
    return fechaFormateada;
}

function cambiarFechaAHoy(fechaISO) {
    let splitFecha = fechaISO.split(','); 
    splitFecha[0] = 'Hoy';
    const fechaHoy = splitFecha.join(' ');
    return fechaHoy;
}


export function obtenerRangoDeFechas(mesesDesplazados = -1) {
    const fechaActual = obtenerFechaDesplazada();
    const fechaInicioRango = obtenerFechaDesplazada(mesesDesplazados);

    return {
        fechaActual: fechaActual,
        fechaInicioRango: fechaInicioRango,
    };
}

export function sumarDiasAFecha(fecha, dias) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
}


function obtenerFechaDesplazada(mesesDesplazados = 0) {
    const nuevaFecha = new Date();
    nuevaFecha.setMonth(nuevaFecha.getMonth() + mesesDesplazados);
    return nuevaFecha;
}

export function formatoFechaYYYYMMDD(fecha) {
    if (!(fecha instanceof Date) || isNaN(fecha)) {
        throw new Error("Fecha inválida: Debe ser un objeto Date válido.");
    }

    return fecha.toISOString().split('T')[0];
}


