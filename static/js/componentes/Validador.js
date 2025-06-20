import { esValorVacio, obtenerElementoPorId } from "../utils/componentes_utils.js";

export class Validador{
    static validarValorColumna(columna, nuevoValor){
        return true
    }
  

}

export function validarColumnasObligatorias(columnas) {

    const columnasObligatoriasVacias = columnas.filter(
        columna => columna.esObligatoria && esValorVacio(columna.valor)
    );


    columnasObligatoriasVacias.forEach(columna => {
        const nodoAlerta = columna._nodoEdicion?? columna._nodoVista;
        nodoAlerta.classList.add("div-faltante");
    });

    if (columnasObligatoriasVacias.length > 0) {
        return false;
    }

    return true; 
}

export function validarDataEnArray(columnas, idBotones){
    if (columnas.length < 2){ // si solo esta la traza
        escribirMensajeJuntoABotones(idBotones, 'No se detectaron cambios en el formulario');
        return false;
    }

    return true;
}

function escribirMensajeJuntoABotones(idBoton, mensaje) {

    const boton = obtenerElementoPorId(idBoton);
    const divBotones = boton.closest("div");

    if (divBotones) {
        const nuevoMensaje = document.createElement("p");
        nuevoMensaje.id = "temporal";
        nuevoMensaje.textContent = mensaje;

        // Insertarlo al inicio del div (antes de los otros elementos)
        divBotones.prepend(nuevoMensaje);
    } else {
        console.warn("No se encontró un div cerca del botón.");
    }
}

export function eliminarMensajeTemporal(){

    try{
        const mensajePrevio = obtenerElementoPorId("temporal");
        if (mensajePrevio) {
            mensajePrevio.remove();
        }
    }
    catch{
        console.log('Ningun mensaje temporal encontrado')
    }
    
}