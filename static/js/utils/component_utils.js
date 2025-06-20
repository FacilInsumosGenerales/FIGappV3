/**
 componenteUtils.js 
 funciones que sirven para llenar o eliminar elementos del DOM
*/

import { config } from "../../../config.js";
import { obtenerData } from "../controladores/api.js";
import { edicionesHistorial } from "../vista/ediciones.js";
import { convertirFechaISO } from "./date_utils.js";
import { seleccionarFilaPorTraza } from "./tabulator_utils.js";


/**
 * llenarComponente
 * Función para llenar un componente HTML o de Tabulator con datos proporcionados.
 * @param {Array} data - Array de datos para llenar el componente.
 * @param {HTMLElement|Tabulator} componente - El componente a llenar, que puede ser una instancia de Tabulator, un elemento HTML <div>, <ul>, <select> o un elemento compatible con select2.
 * @param {HTMLElement} count - Elemento donde se mostrará la cantidad de elementos en `data`.
 * @param {string} selectColumn - Especifica la selección de filas en Tabulator. Los valores posibles son:
 *                                - 'first': selecciona la primera fila.
 *                                - 'none': no selecciona ninguna fila.
 *                                - Otro valor: selecciona la fila que coincida con el valor en la columna TRAZA.
 */
export async function llenarComponente(data, componente = "", count = "", selectColumn = 'first') {
    // Verifica si el componente es una instancia de Tabulator
    if (componente instanceof Tabulator) {
        // Llenar la tabla de Tabulator con los datos
        await llenarTabulator(data, componente, count, selectColumn);

        // Seleccionar la fila especificada en `selectColumn`
        if (selectColumn === 'first') {

            // Consigue todas las filas
            const rows = componente.getRows();

            // Deselecciona cualquier otra que haya sido seleccionada
            rows.forEach(row => componente.deselectRow(row));
            
            // Selecciona la primera fila si existe
            const firstRow = rows[0];
            if (firstRow) {
                componente.selectRow(firstRow);
            }

        } else if (selectColumn === 'none') {
            // No hacer nada si `selectColumn` es 'none'
        } else {
            // Seleccionar una fila específica basada en el valor de `selectColumn`
            seleccionarFilaPorTraza(selectColumn, componente);
        }
        
    }
    else{

        // Actualizar el conteo de elementos si se proporciona el parámetro `count`
        if (count !== "") {
            count.textContent = data.length;
        }

        // Llenar componentes
        if (componente.tagName === 'DIV') {
            // Llenar un elemento <div> con los datos
            llenarDiv(data, componente);
        } else if (componente.tagName === 'UL') {
            // Llenar un elemento <ul> con los datos
            llenarUL(data, componente);
        } else if ($(componente).hasClass("select2-hidden-accessible")) {
            // Llenar un elemento select2 con los datos
            llenarSelect2(data, componente);
        } else if (componente.tagName === 'SELECT') {
            // Llenar un elemento <select> estándar con los datos
            llenarSelect(data, componente);
        }
    }
}


/*  llenarTabulator
Llenar una tabla usando tabulator
data : tipo array - arreglo con informacion que coincidan con los fields a llenar
componente : tabulator - el id de la tabla en tabulator previamente inicializada
count : any : el id del componente HTML que se usara para llenar la cantidad de data que se obtuvo
selectFirst : booleano - Si es true selecciona el primero y si es false no lo selecciona
*/
export function llenarTabulator(data, componente, count) {
    componente.clearData();
    componente.setData(data);

    if (count !== "") {
        let len = componente.getData('active').length;
        count.innerHTML = len;
        return len;
    }

}

/*  llenarDiv
Se encarga de buscar dentro del <div> elementos específicos por su id y 
luego insertar los valores correspondientes de cada objeto en estos elementos.

data : tipo array - arreglo cuyo id debe coincidir con los id del div a llenar
componente : any - el id del componente div HTML a llenar
*/
export function llenarDiv(data, componente) {
    data.forEach(row => {
        Object.keys(row).forEach(key => {
            const element = componente.querySelector(`[id="${key}"]`);
            if (element) {
                element.textContent = row[key];
            }
        });
    });
}

/*  llenarUL
Llena un componente de tipo lista UL

data : tipo array - arreglo con los datos a usar
componente : any - es el id del componente en HTML LI a llenar
*/
export function llenarUL(data, componente) {
    const exampleItem = componente.querySelector('li'); 
    componente.innerHTML = ''; 
    data.forEach(row => {
        const newItem = exampleItem.cloneNode(true);
        Object.keys(row).forEach(key => {
            const element = newItem.querySelector(`[name="${key}"]`);
            if (element) {
                element.textContent = row[key];
            }
        });
        componente.appendChild(newItem);
    });
}

/*  llenarSelect2
Llena un select2

data : tipo array - arreglo con los datos en un select2
componente : any - es el id del componente en HTML select 
*/
export function llenarSelect2(data, componente) {
    // Formatear los datos para select2, excluyendo 'attr1' si no está presente
    const options = data.map(item => {
        let option = {
            id: item.id,    // Valor del option
            text: item.nombre  // Texto visible en el select2
        };

        if (item.attr1) {
            option.attr1 = item.attr1;
        }

        if (item.attr2) {
            option.attr2 = item.attr2;
        }

        if (item.attr3) {
            option.attr3 = item.attr3;
        }

        return option;
    });

    // Vaciar el select2 y agregar las nuevas opciones
    componente.empty().select2({
        data: options,
        width: '300px'
    });
}

/**
 * llenarSelect
 * 
 * Llena un elemento select en HTML con opciones generadas a partir de un arreglo de datos.
 * 
 * @param {Array} data - Arreglo de objetos que contienen los datos para llenar el select. Cada objeto debe tener las llaves `id` o `value` y Nombre.
 * @param {HTMLElement} componente - El elemento select de HTML que será llenado con las opciones. Puede ser accedido por su id o referencia.
 * 
 * @example
 * // Ejemplo de uso:
 * const data = [
 *   { id: 1, nombre: 'Opción 1' },
 *   { id: 2, nombre: 'Opción 2' }
 * ];
 * const selectElement = document.getElementById('miSelect');
 * llenarSelect(data, selectElement);
 */
export function llenarSelect(data, componente, buffer = true) {
    // Guardar el valor actualmente seleccionado
    const previousSelectedValue = componente.value;

    // Limpia las opciones existentes dentro del select
    componente.innerHTML = ''; 

    // Si 'buffer' es verdadero, agregar una opción por defecto
    if (buffer) {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione una opción';
        componente.appendChild(defaultOption);
    }

    // Recorre el arreglo de datos y crea una opción por cada elemento
    data.forEach(row => {
        const option = document.createElement('option');
        option.value = row.id || row.value || '';  // Usa 'id' o 'value' como valor de la opción
        option.textContent = row.nombre;  // Usa 'nombre' como el texto de la opción
        componente.appendChild(option);
    });

    // Verificar si el valor previamente seleccionado todavía está en las opciones y volver a seleccionarlo
    if ([...componente.options].some(option => option.value === previousSelectedValue)) {
        componente.value = previousSelectedValue; // Volver a seleccionar el valor si aún está disponible
    }
}

// Funcion para obtener y llenar un componente segun su tipo
export async function obtenerDatosYLLenarComponente(json, componente="", count="", selectColumn='first') {
    try {
        const data = await obtenerData(json);
        // Llenar el componente con los datos obtenidos
        llenarComponente(data[0].data, componente, count, selectColumn);
        edicionesHistorial.guardarGrupo(data,json.nombreTabla);
        
        return data;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

/* limpiarDiv
Funcion para eliminar todo el contenido del componente excepto el id del div con mensaje vacio
componente: componente html - el componente del div que tendra que eliminar el contenido
idDivVacio: str - el id del div con el mensaje vacio
*/
export function limpiarDiv(componente,idDivVacio){
    const items = componente.querySelectorAll('a');
    items.forEach(item => {
        if (item.id !== idDivVacio) {
            item.remove();
        }
    });
}

export function actualizarCount(elemento, total) {
    if (elemento) {
        elemento.textContent = total;
    }
}

export function limpiarContenido(elemento) {
    elemento.innerHTML = '';
}

export function determinarColorAPartirDeHoras(fechaActual, fechaItem) {

    const fecha = new Date(fechaItem);
    const diferenciaTiempo = fechaActual - fecha;
    const horasDiferencia = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 ));

    if (horasDiferencia > 48) {
        return 'red';
    } else if (horasDiferencia > 24) {
        return 'orange';
    }
    return 'black';
}

export function obtenerUltimaEdicion(ediciones = "") {
    if (!ediciones) return "";

    const secuencias = ediciones.split(';');
    const ultimaSecuencia = secuencias[secuencias.length - 1].trim();

    const ultimaSecuenciaPartida = ultimaSecuencia.split(',');

    // Crear un diccionario con las claves correspondientes
    const edicion = {
        fecha: ultimaSecuenciaPartida[0]?.trim(),        // Primera parte: la fecha y hora
        usuario: ultimaSecuenciaPartida[1]?.trim(),      // Segunda parte: el usuario
        mensaje: ultimaSecuenciaPartida.slice(2).join(',').trim() // Resto: el mensaje completo
    };
    return edicion;
}


export function crearPanel(titulo, subtitulo = "", info="",comentario = '', localStorageData = '', colorTexto = 'Black', toptitulo = "") {
    
    return `
        <a class="list-group-item list-group-item-action deck-row comment-row">
        <h3 style="color: ${colorTexto}!important;">${toptitulo}</h3>
            <div class="comment-title">   
            <div class="deck-title" data-id="${localStorageData ?? ''}" data-estado="${toptitulo ?? ''}">
                    <h5 style="color: ${colorTexto}!important;">
                        ${titulo ?? ''}
                    </h5>
                    <p style="color: ${colorTexto}!important;">
                        ${subtitulo ??''}
                    </p>
                </div>
                <p class="p-semibold align-right" style="color: ${colorTexto}!important;">
                    ${info ?? ''}
                </p>
            </div>
            <div class="comment" style="display: none;">
                ${comentario}
            </div>
        </a>
    `;
}

export function crearComentariosEnDeck(ultimaEdicion,colorTexto){

    let fechaUltimaEdicion;

    try {
        fechaUltimaEdicion =  convertirFechaISO(ultimaEdicion.fecha) ?? '';
    } catch {
        fechaUltimaEdicion = ultimaEdicion.fecha;
    }

    return ```<h6 style="color: ${colorTexto}!important;">
                ${ultimaEdicion.usuario ?? ''} 
                ${fechaUltimaEdicion ?? ''}
            </h6>
            <p style="color: ${colorTexto}!important;">
                ${ultimaEdicion.mensaje ?? ''}
            </p>```;
}

export function agregarEventosInteractividad(contenedor, urlDestino, claveLocalTraza, funcionClick = null) {

    contenedor.querySelectorAll('.comment-row').forEach(row => {

        const commentElement = row.querySelector('.comment');

        row.addEventListener('mouseenter', () => {
            commentElement.style.display = 'block';
        });

        row.addEventListener('mouseleave', () => {
            commentElement.style.display = 'none';
        });

        if (funcionClick) {
            row.addEventListener('click', () => funcionClick(row));
        }
        else{
            row.addEventListener('click', () => {
                const id = row.querySelector('.deck-title').getAttribute('data-id');
                gestionarLocalStorage(claveLocalTraza, id);
                window.location.href = urlDestino;
            });
        }
        
    });
}



function gestionarLocalStorage(clave, valor) {
    const claveAlmacenamiento = clave || "selectedReqId";

    if (localStorage.getItem(claveAlmacenamiento)) {
        localStorage.removeItem(claveAlmacenamiento);
    }

    localStorage.setItem(claveAlmacenamiento, valor);
}


// #endregion 

//Funcion que sirve para retirar el readOnly de los input y textarea de un div
export function removeReadOnlyInDiv(miDiv) {
    // Seleccionamos todos los inputs, textareas y selects dentro del div
    const elements = miDiv.querySelectorAll('input, textarea, select');

    // Recorremos todos los elementos
    elements.forEach(element => {
        if (element.tagName === 'SELECT') {
            // Si es un select, le quitamos el atributo disabled
            element.removeAttribute('disabled');
        } else if (element.tagName === 'INPUT' && element.type === 'file') {
            // Si es un input de tipo file, le quitamos el atributo disabled
            element.removeAttribute('disabled');
        } else {
            // Para todos los demás inputs y textareas, le quitamos el atributo readonly
            element.removeAttribute('readonly');
        }
    });
}

//Funcion que sirve para colocar en readOnly todos los input y textarea de un div
export function activeReadOnlyInDiv(miDiv) {
    // Seleccionamos todos los inputs, textareas y selects dentro del div
    const elements = miDiv.querySelectorAll('input, textarea, select');

    // Recorremos todos los elementos
    elements.forEach(element => {
        if (element.tagName === 'SELECT') {
            // Si es un select, le agregamos disabled
            element.setAttribute('disabled', true);
        } else if (element.tagName === 'INPUT' && element.type === 'file') {
            // Si es un input de tipo file, le agregamos disabled
            element.setAttribute('disabled', true);
        } else {
            // Para todos los demás inputs y textareas, le agregamos readonly
            element.setAttribute('readonly', true);
        }
    });
}


// Función para manejar el evento de clic y cerrar el acordeón
export function toggleAccordionCollapse(accordionId) {
    const accordion = document.getElementById(accordionId); // Obtén el acordeón por ID

    if (!accordion) return; // Verificar si el acordeón existe

    // Selecciona el botón y el colapso dentro del acordeón
    const accordionButton = accordion.querySelector('.accordion-button');
    const accordionCollapse = accordion.querySelector('.accordion-collapse');

    accordionButton.addEventListener('click', function (e) {
        // Prevenir el comportamiento predeterminado de Bootstrap
        e.preventDefault(); // Previene el comportamiento predeterminado del botón

        // Alternar el estado del acordeón manualmente
        if (accordionCollapse.classList.contains('show')) {
            // Si tiene la clase 'show', la quitamos
            accordionCollapse.classList.remove('show');
            accordionButton.setAttribute('aria-expanded', 'false'); // Actualiza el atributo aria
        } else {
            // Si no tiene la clase 'show', la añadimos (opcional)
            accordionCollapse.classList.add('show');
            accordionButton.setAttribute('aria-expanded', 'true'); // Actualiza el atributo aria
        }
    });
}


// El cuerpo del modal para modificar las descripciones de los productos cotizados
export function updateModalProductosCotizadosDescripcion(arr) {
    const modalDiv = document.getElementById('modalProductosDescripcion');
    modalDiv.innerHTML = ''; // Limpia el contenido del modal

    arr.forEach(item => {
        const infoDetailDiv = document.createElement('div');
        infoDetailDiv.classList.add('info-detail');
        
        const p = document.createElement('p');
        p.innerHTML = `${item['Producto_Oferta_TRAZA']}<br>${item['Descripcion_proveedor']}`;

        const textarea = document.createElement('textarea');
        textarea.value = item['Descripcion_cliente'];
        textarea.dataset.traza = item['Producto_Oferta_TRAZA']; // Asocia la traza al textarea usando dataset

        infoDetailDiv.appendChild(p);
        infoDetailDiv.appendChild(textarea);
        modalDiv.appendChild(infoDetailDiv);
    });
}

// Conseguir datos del modal con descripciones de los productos
export function obtenerValoresModalProdDesc() {
    const modalDiv = document.getElementById('modalProductosDescripcion');
    const textareas = modalDiv.querySelectorAll('textarea'); // Selecciona todos los textareas
    const resultado = [];

    // Recorre todos los textarea y recoge sus valores junto con la traza
    textareas.forEach(textarea => {
        resultado.push({
            TRAZA: textarea.dataset.traza, // Obtiene la traza desde dataset
            descripcionProducto: textarea.value // Obtiene el valor del textarea
        });
    });

    return resultado; // Devuelve el arreglo con los valores
}


/**
 * Bloquea un acordeón ocultando una sección específica y deshabilitando el primer botón.
 *
 * @param {HTMLElement} accordion - El elemento HTML del acordeón que se desea bloquear.
 *
 * 1. Selecciona el div colapsable dentro del acordeón con la clase específica 'accordion-collapse collapse item-1'
 *    y remueve la clase 'show' para ocultar esta sección.
 * 2. Selecciona el primer botón dentro del acordeón y establece el atributo 'disabled' para deshabilitarlo.
 */
export function lockAccordion(accordion) {
    // Selecciona el div colapsable con clases específicas para ocultarlo
    const collapseDiv = accordion.querySelector('.accordion-collapse.collapse.item-1');
    collapseDiv.classList.remove('show');

    // Selecciona el primer botón dentro del acordeón y lo deshabilita
    const firstButton = accordion.querySelector('button');
    firstButton.setAttribute('disabled', true);
    firstButton.classList.add('no-background-image-accordion');
}

/**
 * Desbloquea un acordeón, permitiendo la interacción con el primer botón.
 *
 * @param {HTMLElement} accordion - El elemento HTML del acordeón que se desea desbloquear.
 *
 * Selecciona el primer botón dentro del acordeón y remueve el atributo 'disabled' para habilitarlo.
 */
export function unlockAccordion(accordion) {
    // Selecciona el primer botón dentro del acordeón y lo habilita
    const firstButton = accordion.querySelector('button');
    firstButton.removeAttribute('disabled');

    firstButton.classList.remove('no-background-image-accordion');

}



/**
 * Activa el estado de solo lectura o deshabilita elementos específicos.
 *
 * @param {HTMLElement[]} elementos - Lista de elementos HTML que se desean activar.
 *
 * Esta función realiza las siguientes acciones:
 * - Agrega el atributo 'disabled' a los elementos `<select>`, `<input type="file">` y `<button>`.
 * - Agrega el atributo 'readonly' a todos los demás elementos de entrada, como `<input>` y `<textarea>`.
 */
export function desactivarElementos(elementos) {
    // Recorre todos los elementos de la lista
    elementos.forEach(element => {

        // Deshabilita selects
        if (element.tagName === 'SELECT') {
            element.setAttribute('disabled', true);
        } 
        // Deshabilita inputs de tipo file
        else if (element.tagName === 'INPUT' && element.type === 'file') { 
            element.setAttribute('disabled', true);
        } 
        // Deshabilita botones
        else if (element.tagName === 'BUTTON') {
            element.setAttribute('disabled', true);
        }
        // Establece otros inputs y textareas en modo solo lectura
        else {
            element.setAttribute('readonly', true);
        }
    });
}

/**
 * Desactiva el estado de solo lectura o habilita elementos específicos.
 *
 * @param {HTMLElement[]} elementos - Lista de elementos HTML que se desean desactivar.
 *
 * Esta función realiza las siguientes acciones:
 * - Quita el atributo 'disabled' de los elementos `<select>`, `<input type="file">` y `<button>`.
 * - Quita el atributo 'readonly' de todos los demás elementos de entrada, como `<input>` y `<textarea>`.
 */
export function activarElementos(elementos) {
    // Recorre todos los elementos de la lista
    elementos.forEach(element => {
        
        // Habilita selects
        if (element.tagName === 'SELECT') {
            element.removeAttribute('disabled');
        } 
        // Habilita inputs de tipo file
        else if (element.tagName === 'INPUT' && element.type === 'file') {
            element.removeAttribute('disabled');
        } 
        // Habilita botones
        else if (element.tagName === 'BUTTON') {
            element.removeAttribute('disabled');
        } 
        // Quita modo solo lectura de otros inputs y textareas
        else {
            element.removeAttribute('readonly');
        }
    });
}

// Función para ocultar elementos con ID que terminan en "Lectura" y mostrar sus contrapartes
export function ocultarElementosLectura() {
    const elementosLectura = document.querySelectorAll("[id$='Lectura']");
    
    elementosLectura.forEach((elementoLectura) => {
        const idBase = elementoLectura.id.replace("Lectura", ""); // Base del ID
        const elementoNormal = document.getElementById(idBase); // Elemento sin 'Lectura'

        if (elementoNormal) {
            elementoNormal.style.display = ""; // Muestra el elemento normal
        }
        elementoLectura.style.display = "none"; // Oculta el elemento 'Lectura'
    });
}

// Función para mostrar elementos con ID que terminan en "Lectura" y ocultar sus contrapartes
export function mostrarElementosLectura() {
    const elementosLectura = document.querySelectorAll("[id$='Lectura']");
    
    elementosLectura.forEach((elementoLectura) => {
        const idBase = elementoLectura.id.replace("Lectura", ""); // Base del ID
        const elementoNormal = document.getElementById(idBase); // Elemento sin 'Lectura'
        
        if (elementoNormal) {
            elementoNormal.style.display = "none"; // Oculta el elemento normal
        }
        elementoLectura.style.display = ""; // Muestra el elemento 'Lectura'
    });
}

// Función para mostrar elementos con ID que terminan en "Lectura" y ocultar sus contrapartes dentro de un div específico
export function mostrarElementosLecturaEnDiv(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    
    if (!contenedor) {
        console.error(`No se encontró el contenedor con el id "${contenedorId}"`);
        return;
    }

    // Seleccionar solo elementos con id que terminan en 'Lectura' dentro del div específico
    const elementosLectura = contenedor.querySelectorAll("[id$='Lectura']");
    
    elementosLectura.forEach((elementoLectura) => {
        const idBase = elementoLectura.id.replace("Lectura", ""); // Base del ID
        const elementoNormal = contenedor.querySelector(`#${idBase}`); // Buscar la contraparte dentro del mismo div
        
        if (elementoNormal) {
            elementoNormal.style.display = "none"; // Oculta el elemento normal
        }
        elementoLectura.style.display = ""; // Muestra el elemento 'Lectura'
    });
}

// Función para ocultar elementos con ID que terminan en "Lectura" y mostrar sus contrapartes
export function ocultarElementosLecturaEnDiv(contenedorId) {

    const contenedor = document.getElementById(contenedorId);

    if (!contenedor) {
        console.error(`No se encontró el contenedor con el id "${contenedorId}"`);
        return;
    }
    
    // Seleccionar solo elementos con id que terminan en 'Lectura' dentro del div específico
    const elementosLectura = contenedor.querySelectorAll("[id$='Lectura']");
    
    elementosLectura.forEach((elementoLectura) => {
        const idBase = elementoLectura.id.replace("Lectura", ""); // Base del ID
        const elementoNormal = document.getElementById(idBase); // Elemento sin 'Lectura'

        if (elementoNormal) {
            elementoNormal.style.display = ""; // Muestra el elemento normal
        }
        elementoLectura.style.display = "none"; // Oculta el elemento 'Lectura'
    });
}

export function reemplazarComasPorPuntos(texto) {

    let textoSinPuntoComas = texto.replace(/;/g, '.');
    let textoSinComas = textoSinPuntoComas.replace(/,/g, '.');

    textoSinComas = textoSinComas.split('.').map((frase) => {
        frase = frase.trim();
        
        if (frase) {
            return frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase();
        }
        return frase; 
    }).join('. '); 

    return textoSinComas; 
}


export function generarHTMLImagen(imagenURL){
    return `<span style="overflow: hidden; display: inline-block; margin: 0px; width: 84.21px;">
                <img alt="" src="${imagenURL}" style="width: 100%; height: auto;" title="">
            </span>`;
}

export function llenarLinkEnLabel(imagen,label){
    label.textContent =  imagen;
    label.href = `../../../${config.storage_url}/${imagen}`;
    label.setAttribute("target", "_blank");
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