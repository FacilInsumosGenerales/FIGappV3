import { CotizacionPlantillaPDF } from "../componentes/plantillaPDF/CotizacionPlantillaPDF.js";
import { OrdenPlantillaPDF } from "../componentes/plantillaPDF/OrdenPlantillaPDF.js";

// Data
const urlsPlantillas = {
    'cotizacion': "../static/js/componentes/plantillaPDF/cotizacion.html",
    'orden de compra': "../static/js/componentes/plantillaPDF/ocproveedor.html"
};


// Clases
export class PlantillaPDFFabrica {
    
    static async crearPlantillaPDF(tipo) {
        validarTipo(tipo);
        const plantillaHTML = await cargarPlantilla(urlsPlantillas[tipo]);
        return instanciarPlantilla(tipo, plantillaHTML);
    }  
}

// Funciones internas
function validarTipo(tipo) {
    if (!urlsPlantillas[tipo]) {
        throw new Error(`Tipo de plantilla desconocido: ${tipo}`);
    }
}

async function cargarPlantilla(url) {

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error al cargar la plantilla (${respuesta.status}): ${respuesta.statusText}`);
    }

    return respuesta.text();
}

function instanciarPlantilla(tipo, plantillaHTML) {
    if (tipo === 'orden de compra') {
        return new OrdenPlantillaPDF(plantillaHTML);
    }
    return new CotizacionPlantillaPDF(plantillaHTML);
}