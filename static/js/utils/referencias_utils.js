import { Columna } from "../componentes/Columna.js";
import { obtenerData } from "../componentes/RecopiladorDatos.js";


// Actualizar referencias indiviuales
export function ingresoNuevaReferencia(columnasIngresadas, traza) {

    const prefijoTabla = columnasIngresadas[0].nombreTablaMadre;

    window.cacheReferencias = window.cacheReferencias || {}; 

    const clavesCache = Object.keys(window.cacheReferencias);
    const cachesPertenecienteATabla = clavesCache.filter(key => {
        return key.split('_')[0] === prefijoTabla;
    });


    cachesPertenecienteATabla.forEach(nombreColumna => {
        const columnaActualizada = columnasIngresadas.find(col => col.nombreUnico === nombreColumna);

        if (columnaActualizada) {
            // Asegura que la referencia exista
            const referencia = window.cacheReferencias[nombreColumna];
            referencia[traza] = columnaActualizada.valor;
            
        }
    });
}


// Carga de todas las referenciass
export async function cargarReferencias(columnasQuePuedenNecesitarReferencias) {
        
    const columnasReferenciadas = obtenerColumnasReferenciadas(columnasQuePuedenNecesitarReferencias);


    window.cacheReferencias = window.cacheReferencias || {}; 


    for (const columnaRef of columnasReferenciadas) {

        if (!window.cacheReferencias[columnaRef.nombreUnico]){
            await conseguirColumna(columnaRef);
        } 
    }
}

function obtenerColumnasReferenciadas(columnasConReferencias) {
    const referenciasUnicas = new Map();

    for (const columna of columnasConReferencias) {
        if (!tieneReferencia(columna)) continue;

        const referencias = Array.isArray(columna.formato) ? columna.formato : [columna.formato];

        for (const colRef of referencias) {
            if (colRef instanceof Columna && !referenciasUnicas.has(colRef.nombreUnico) ) {
                referenciasUnicas.set(colRef.nombreUnico, colRef);
            }
        }
    }

    return Array.from(referenciasUnicas.values());
}


function tieneReferencia(columna) {
    const formato = columna.formato;
    return formato && (formato instanceof Columna || (Array.isArray(formato) && formato.length > 0));
}

async function conseguirColumna(columna) {
    while (columna instanceof Columna) {
        try {
            const nuevosDatos = await fetchReferencias(columna);
            const nombreCache = columna.nombreUnico;

            if (nuevosDatos.length > 0) {
                guardarEnCache(nombreCache, nuevosDatos);
            }

            if (columna.formato) {
                columna = columna.formato;  // Cambiar la columna a la siguiente
            } else {
                break;  // Salir del bucle si 'columna.formato' no está definido
            }
    
        } catch (error) {
            console.error(`Error obteniendo referencias para ${columna.nombreUnico}:`, error);
            break;  // Puedes salir del bucle si ocurre un error
        }
    }
}




async function fetchReferencias(columna) {
    const jsonData = armarJSONreferencias(columna)
    const respuestaData = await obtenerData(jsonData.tabla, jsonData.columnas);    
    if (!respuestaData || !respuestaData.datos) {
        throw new Error(`Error obteniendo las referencias de la columna ${columna}`);
    }

    return respuestaData.datos;
}

function guardarEnCache(nombreCache, nuevosDatos) {

    window.cacheReferencias[nombreCache] = {};    

    const nombreColumnaReferencia = Object.keys(nuevosDatos[0]).find(key => key !== "TRAZA");

    if (!nombreColumnaReferencia) {
        console.error(`No se encontró una columna de referencia en los datos para ${nombreCache}`);
        return;
    }

    // Convertir la lista en { TRAZA: NombreColumnaDinamico }
    const referenciasFormateadas = nuevosDatos.reduce((acc, item) => {
        if (item.TRAZA !== undefined && item[nombreColumnaReferencia]) {
            acc[item.TRAZA] = item[nombreColumnaReferencia];
        }
        return acc;
    }, {});

    Object.assign(window.cacheReferencias[nombreCache], referenciasFormateadas);

    avisarActualizacionCache();
}

function avisarActualizacionCache(nombreCache){
    const eventoCacheModificado = new CustomEvent("cacheModificado", { detail: { nombreCache } });
    document.dispatchEvent(eventoCacheModificado);
}

function armarJSONreferencias(columna){
    return {
        tabla:columna.nombreTablaMadreCompleto,
        columnas: [columna]
    }
}

// Para conseguir data
export function buscarTextoEnCacheReferencias(formatoDeReferencias, valor) {
    //formatoDeReferencias puede ser una columna o una lista de columnas
    if (!valor || valor === "") return "";

    
    const listaColumnasReferencias = convertirALista(formatoDeReferencias);
    let resultado = "";

    for (const columnaReferencia of listaColumnasReferencias) {
        resultado += obtenerTextoDesdeReferencia(columnaReferencia, valor);
    }

    return resultado;
}

function obtenerTextoDesdeReferencia(diccionarioReferencia, valor) {
    const cacheReferencias = window.cacheReferencias || {};

    while (esDiccionario(diccionarioReferencia) || (diccionarioReferencia instanceof Columna)) {

        const nombreUnico = diccionarioReferencia.nombreUnico || 'diccionario';
        const nuevoValor = (cacheReferencias[nombreUnico] || diccionarioReferencia)[valor] || '';
        
        // Si no hay más niveles de referencia, retornamos el valor encontrado
        if (!diccionarioReferencia.formato) {
            return nuevoValor;
        }
        
        // Pasamos al siguiente nivel de referencia
        diccionarioReferencia = diccionarioReferencia.formato;
        valor = nuevoValor;
    }

    // Algunas columnas pueden tener listas dentro de sus listas
    if (Array.isArray(diccionarioReferencia)){
        return buscarTextoEnCacheReferencias(diccionarioReferencia,valor);
    }
    
    // Si no es un diccionario, retornamos el valor directamente (podría ser texto u otro tipo)
    return diccionarioReferencia;
}


export function convertirALista(puedeSerLista){
    return Array.isArray(puedeSerLista) ? puedeSerLista : [puedeSerLista];
}


function esDiccionario(quizaDiccionario){
    return quizaDiccionario && typeof quizaDiccionario === 'object' && !Array.isArray(quizaDiccionario);
}