export function obtenerElementoPorId(id) {
    const elemento = document.getElementById(id);
    if (!elemento) {
        throw new Error(`Elemento con ID ${id} no encontrado.`);
    }
    return elemento;
}

export function ocultarElementos(elementos){
    elementos.forEach(element => {
        element.style.setProperty("display", "none", "important");
    });
};

export function mostrarElementos(elementos){
    elementos.forEach(element => {
        element.style.setProperty("display", "flex", "important");
    });
};

export function alertaFinalInicializacion(){
    const evento = new Event("incializacionTerminada");
    document.dispatchEvent(evento);
}

export function esValorVacio(valor) {
    return (
        valor === null ||
        valor === undefined ||
        (typeof valor === "string" && valor.trim() === "") ||
        (typeof valor === "number" && Number.isNaN(valor))
    );
}

export function llenarBarraProgreso(ratio){
    const porcentaje = ratio * 100;
    const barraProgreso = document.querySelector('.progress-bar');
    barraProgreso.style.width = porcentaje + '%';
    barraProgreso.setAttribute('aria-valuenow', porcentaje);
    barraProgreso.textContent = porcentaje + '%';
}
