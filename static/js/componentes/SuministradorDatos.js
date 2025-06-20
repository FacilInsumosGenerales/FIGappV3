import { esValorVacio } from "../utils/componentes_utils.js";
import { ingresoNuevaReferencia } from "../utils/referencias_utils.js";
import { validarColumnasObligatorias, validarDataEnArray } from "./Validador.js";
// esta funcion deberia estar aqui si solo se usa en esta pagina. Cual es el punto de tenerlo en api?
// Toda esta pagina podria estar dentro del recopilador de datos

export class SuministradorDatos { // es necesario tener el suministrador? cual es el punto de tenerlo como clase?

    static async guardarData(columnas, idBotones) {

        if (!validarColumnasObligatorias(columnas)) {
            return resultadoFallido;
        }
    
        const esNuevo = esValorTrazaInvalido(columnas);
    
        const columnasConData = filtrarColumnasData(columnas);
        let columnasAGuardar = esNuevo
            ? columnasConData
            : filtrarColumnasConCambio(columnasConData);
    
        if (!validarDataEnArray(columnasAGuardar, idBotones)) {
            return resultadoFallido;
        }
    
        //columnasAGuardar = await guardarArchivos(columnasAGuardar);

        try{
            await guardarData(esNuevo,columnasAGuardar);

            if(esNuevo){
                //TODO: devolver nueva traza si es data nueva
                ingresoNuevaReferencia(columnasAGuardar, '1');
                return { cambioExitoso: true, tipo: 'nuevo', traza: nuevaTRAZA };

            }
            else {
                return { cambioExitoso: true, tipo: 'actualizacion' };

            }

        }
        catch (error) {
            console.error("Error en la solicitud:", error);
            return resultadoFallido;
        }
    
    
    }
    
    static async crearNuevosValores(valoresNuevos){
        if (!verificarTablaMadreUniforme(valoresNuevos)) return

        const jsonCrearValores = crearJSONNuevaDataMultiple(valoresNuevos);
        const data = await guardarData(jsonCrearValores);
        console.log(data);
    }
    
}

const resultadoFallido = { cambioExitoso: false, tipo: undefined };

function filtrarColumnasConCambio(columnas){
    return columnas.filter(col => col.cambioEnData || col.nombreEnBD === 'TRAZA');
}

function filtrarColumnasData(columnas){
    return columnas.filter(col => !esValorVacio(col.valor)  || col.nombreEnBD === 'TRAZA');
}

async function guardarArchivos(columnas) {
    return await Promise.all(columnas.map(columnaArchivo => guardarUnArchivo(columnaArchivo)));
}


async function guardarUnArchivo(columna) {
    if (columna.tipo === 'file') {
        try {
            columna.valor = await enviarArchivo(columna.valor);
        } catch {
            console.log('Error al guardar data');
            // TODO: Mostrar error a usuario sobre que no fue posible guardar su archivo
        }
    }
    return columna;
}

async function enviarArchivo(archivo) {
    const formData = new FormData();
    formData.append('archivo', archivo);  // 'archivo' es el nombre del campo que recibirá el archivo en el backend

    try {
        const response = await fetch('/api/subir-archivo/', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Archivo guardado en:", data.ruta);
        } else {
            console.error("Error al guardar archivo:", data);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}



function esValorTrazaInvalido(columnas) {
    const columnaTraza = columnas.find(col => col.nombreEnBD === 'TRAZA');

    return !columnaTraza || columnaTraza.valor === "" || columnaTraza.valor === null || columnaTraza.valor === undefined;
}





function crearJSONNuevaDataMultiple(valoresNuevos){

    const columnaEjemplo = [valoresNuevos[0].columna]; // estructura para usa conseguirNombreTabla. Podria mejorar
    return {
        "nombreTabla": conseguirNombreTabla(columnaEjemplo),	
        "informacionColumnas": conseguirInfoColumnasMultiples(valoresNuevos),
    };
} 



function conseguirInfoColumnasMultiples(infoAGuardar) {
    // Inicializamos con un array que tiene un objeto vacío
    let combinaciones = [{}];

    // Recorrer cada columna de infoAGuardar
    infoAGuardar.forEach(columna => {
        // Crear un array para almacenar las nuevas combinaciones
        const nuevasCombinaciones = [];

        // Recorrer las combinaciones existentes
        combinaciones.forEach(combinacion => {

            columna.valores.forEach(valor => {
                // Crear una nueva combinación añadiendo el valor actual
                nuevasCombinaciones.push({
                    ...combinacion, // Mantener las combinaciones previas
                    [columna.columna.nombreEnBD]: valor // Añadir el valor de la columna
                });
            });
        });

        // Actualizar el array de combinaciones con las nuevas combinaciones
        combinaciones = nuevasCombinaciones;
    });

    return combinaciones;
}



function conseguirNombreTabla(columnas){
    const columna = columnas[0];

    return columna.nombreTablaMadreCompleto;
}




function verificarTablaMadreUniforme(columnas) {
    if (columnas.length === 0) return false;

    // Obtener la primera columna para comparar
    const tablaMadreReferencia = columnas[0].tablaMadre;

    for (let columna of columnas) {
        if (columna.tablaMadre !== tablaMadreReferencia) {
            console.log('Todas las columnas tienen que pertenecer a la misma tabla')
            return false; 
        }
    }

    return true; 
}

async function guardarData(esNuevo,columnasAGuardar){

    const url = esNuevo ? '/api/guardar/' : '/api/actualizar/';
    
    const data = {
        columnas: conseguirInfoColumnas(columnasAGuardar),
        nombreTabla: conseguirNombreTabla(columnasAGuardar)
        // Agregar cualquier otro dato necesario (como el ID si se está actualizando)
    };
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const resultado = await response.json();

    if (response.ok) {
        if (esNuevo) {
            ingresoNuevaReferencia(columnasAGuardar, resultado.traza);
            return { cambioExitoso: true, tipo: 'nuevo', traza: resultado.traza };
        } else {
            return { cambioExitoso: true, tipo: 'actualizacion' };
        }
    } else {
        console.error("Error en la respuesta del servidor", resultado);
        return resultadoFallido;
    }
    
}


function conseguirInfoColumnas(columnas) {
    return columnas.reduce((info, col) => {
        if (col.nombreEnBD !== 'TRAZA') {
            info[`${col.nombreOriginal}`] = col.valor;
        }
        return info;
    }, {});
}