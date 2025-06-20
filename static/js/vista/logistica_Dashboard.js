import { obtenerData } from "../controladores/api.js";
import { jsonMovimientosLogistico, jsonNuevasOCcCliente } from "../data/logistica_Dashboard_data.js";
import { checksession } from "../session.js";
import { actualizarCount, 
    agregarEventosInteractividad, 
    crearPanel, 
    limpiarContenido, 
    limpiarDiv,
    ocultarElementos 
} from "../utils/component_utils.js";
import { convertirFechaISO } from "../utils/date_utils.js";

// ANTES DE CARGAR LA PAGINA
checksession();

document.addEventListener("DOMContentLoaded", async function ()  { 

    // #region DOM: Div para mostrar informacion
    var occlientes;
    var movimientosLogisticos;

    const divNuevasOCS = document.getElementById('divNuevaOC');
    const countOCc = document.getElementById("countNuevaOC");
    const divMovimientos = document.getElementById("divMovimientos");
    const countMovimiento = document.getElementById("countMovimientos");
    var iconRedNuevasOCs = document.getElementById("iconRed");
    var iconYellowNuevasOCs = document.getElementById("iconYellow");
    // #endregion

    // #region Funcion
    function actualizarDivDashboardLogisticaMovimiento() {
        const fechaActual = new Date();

        actualizarCount(countMovimiento, movimientosLogisticos.length);
        limpiarContenido(divMovimientos);

        movimientosLogisticos.forEach(item => {
            const colorTexto = determinarColorAPartirDeHorasLogisticaMovimiento(fechaActual, item['Fecha_planeada']);
            const lugares = conseguirLugares(item,colorTexto);
            const elementoPanel = crearPanel(item.empresaProveedor,"",convertirFechaISO(item['Fecha_planeada']),lugares,
            item.TRAZA, colorTexto);
   
            divMovimientos.insertAdjacentHTML('beforeend', elementoPanel);
        });

        agregarEventosInteractividad(divMovimientos, "Logistica/Movimientos.html","LogisticaMovimientos_Traza");

    }

    function conseguirLugares(dataItem, colorTexto){
        return `
            <p style="color: ${colorTexto} !important;"><b>Lugar_Inicial:</b> ${dataItem.lugarInicio}</p>
            <p style="color: ${colorTexto} !important;"><b>Lugar_Final:</b> ${dataItem.lugarFinal}</p>
        `;
    }  

    function determinarColorAPartirDeHorasLogisticaMovimiento(fechaActual, fechaItem) {
        // Crear objetos de fecha truncados a "solo fecha" (sin tiempo)
        const fechaActualSinHora = new Date(
            fechaActual.getFullYear(), 
            fechaActual.getMonth(), 
            fechaActual.getDate()
        );
    
        const fechaMovimiento = new Date(
            fechaItem.split(" ")[0]
        );
    
        // Calcular la diferencia en días
        const diferenciaDias = Math.ceil(
            (fechaMovimiento - fechaActualSinHora) / (1000 * 60 * 60 * 24)
        );
    
        if( diferenciaDias == 0 ){
            return 'green';
        } else if ( diferenciaDias < 0 ) {
            return 'red'; 
        } else if (diferenciaDias == 2) {
            return 'orange';
        }
        
        return 'black';
    }
    
    function prepararSecuenciaOCProveedores(listaOCProveedor) {
        const listaOcProveedoresFormateado= listaOCProveedor.split(';').map(prepararVistaOCProveedor);
    
        // Unir los elementos preparados con '<br>'
        return listaOcProveedoresFormateado.join('<br>');
    }
    
    function prepararVistaOCProveedor(elemento) {

        const partes = elemento.split(',');
        const [fecha, proveedor, codigoOC] = partes;
    
        const fechaISO = convertirFechaISO(fecha,false);
    
        const fechaNegrita = `<b>${fechaISO}</b>`;
    
        const codigoOCItalica = `<i>${codigoOC}</i>`;
    
        return `${fechaNegrita}<br>${proveedor}: ${codigoOCItalica}`;
    }
    
    function actualizarDivDashboardLogisticaOCCliente(){

        countOCc.textContent = occlientes.length;

        divNuevasOCS.innerHTML = '';

        occlientes.forEach(item => {
            crearDeckOCClientes(item);
        });
    
        divNuevasOCS.querySelectorAll('.comment-row').forEach(rowElement => {
            animarDeckOCClientes(rowElement);
        });
        
    }

    function crearDeckOCClientes(item){

        let listaOCProveedores = conseguirListaFormateadaDeOCProveedores(item);
        let colorTexto = determinarColorOCClietes(item);
        let fecha = item.fecha !== undefined && item.fecha !== "" ? convertirFechaISO(item.fecha) : '';

        const card_deck = `
            <a class="list-group-item list-group-item-action deck-row comment-row">
                <div class="comment-title">
                    <div class="deck-title" data-id="${item.TRAZA ?? ''}">
                        <h5 style="color: ${colorTexto}!important;">
                            ${item.codigo ?? ''}: ${item.nombre ?? ''}
                        </h5>
                    </div>
                    <p class="p-semibold align-right" style="color: ${colorTexto}!important;">
                        ${fecha}
                    </p>
                </div>
                <div class="comment" style="display: none;">
                    <p style="color: ${colorTexto}!important;">${listaOCProveedores}</p>
                </div>
            </a>
        `;

        divNuevasOCS.insertAdjacentHTML('beforeend', card_deck);
    }

    function conseguirListaFormateadaDeOCProveedores(item){
        var listaOCProveedor = item.listaOCProveedor ?? "";

        let secuencias = "";
        if (listaOCProveedor !== "") {
            secuencias = prepararSecuenciaOCProveedores(listaOCProveedor);
        }

        return secuencias;
    }

    function determinarColorOCClietes(item){

        const hoy = new Date(); 
        const fechaEntregaCliente = new Date(item.fecha);  
        const miliSecHastaEntrega = fechaEntregaCliente - hoy; 
        const horasHastaEntrega = Math.ceil(miliSecHastaEntrega / (1000 * 60 * 60 )); // Convertir horas

        let colorTexto = 'black';

        if( item.Estado == 2 ){ //TODO: Estado no puede ser igual a 2. Que es dos? cual es la importancia?
            colorTexto = 'green';
        } 
        
        
        if (horasHastaEntrega < 0){
            colorTexto = 'red';
        }
        else if ( horasHastaEntrega < 24 ) {
            colorTexto = 'orange';
        }

        return colorTexto;
    }

    function animarDeckOCClientes(rowElement){
        const commentElement = rowElement.querySelector('.comment');
        
        rowElement.addEventListener('mouseenter', function () {
            commentElement.style.display = 'block';
        });
    
    
        rowElement.addEventListener('mouseleave', function () {
            commentElement.style.display = 'none';
        });
    
    
        rowElement.addEventListener('click', function () {
            const id = this.querySelector('.deck-title').getAttribute('data-id');
            const selectedReqId = "LogisticaNuevasOCs_Traza";

            if (localStorage.getItem(selectedReqId)) {
                localStorage.removeItem(selectedReqId);
            }
    
            // Guardar el nuevo valor en localStorage
            localStorage.setItem(selectedReqId, id);
            window.location.href = "Logistica/NuevasOCs.html","LogisticaNuevasOCs_Traza";
        });
    }

    function buscarFechaMaximaMinimaMovimientoLogistico(){
        if( movimientosLogisticos.length > 0 ){
            const fechasValidos = movimientosLogisticos.filter(item => item['Fecha_planeada'] !== null);
            const fechasMovimientoLogistico = fechasValidos.sort((a, b) => new Date(a['Fecha_planeada']) - new Date(b['Fecha_planeada']));
            localStorage.setItem(
                "LogisticaMovimientos_FechaInicio",
                fechasMovimientoLogistico[0]['Fecha_planeada'].split(" ")[0]);
            localStorage.setItem(
                "LogisticaMovimientos_FechaFin",
                fechasMovimientoLogistico[fechasMovimientoLogistico.length - 1]['Fecha_planeada'].split(" ")[0]);
    
            console.log("LogisticaMovimientos_FechaInicio",localStorage.getItem("LogisticaMovimientos_FechaInicio"));
            console.log("LogisticaMovimientos_FechaFin",localStorage.getItem("LogisticaMovimientos_FechaFin"));
        }
    }

    // #endregion

    handleData();
    async function handleData(){

        ocultarElementos([iconRedNuevasOCs, iconYellowNuevasOCs]);

        let respuestaNuevaOCCliente = await obtenerData(jsonNuevasOCcCliente);
        occlientes = respuestaNuevaOCCliente[0].data;

        let respuestaMovimientosLogisticos = await obtenerData(jsonMovimientosLogistico);
        movimientosLogisticos = respuestaMovimientosLogisticos[0].data;

        limpiarDiv(divNuevasOCS,"item-vacio-ocs");
        limpiarDiv(divMovimientos,"item-vacio-movimientos");

        if ( occlientes.length > 0 ){
            actualizarDivDashboardLogisticaOCCliente();
        }

        if( movimientosLogisticos.length > 0 ){
            actualizarDivDashboardLogisticaMovimiento();
        }

        buscarFechaMaximaMinimaMovimientoLogistico();

    }
    
});
