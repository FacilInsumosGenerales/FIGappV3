import { ejecutarSP, obtenerData } from "../controladores/api.js";
import { jsonGetCotizaciones, jsonGetOCClientes, jsonGetOCClientesFechas, jsonReqPendientes } from "../data/comercial_Dashboard_data.js";
import { checksession } from "../session.js";
import { actualizarCount, agregarEventosInteractividad, crearPanel, determinarColorAPartirDeHoras, limpiarContenido, obtenerUltimaEdicion } from "../utils/component_utils.js";
import { convertirFechaISO, formatearFechaComoYYMMDD } from "../utils/date_utils.js";
import { estadosReq } from "../data/estados_data.js";
import { obtenerElementoPorId } from "../utils/componentes_utils.js";


// ANTES DE CARGAR LA PAGINA
checksession();

//INICIO AL CARGAR LA PAGINA
$(document).ready(async function(){

    // #region Varaibles
    var OCClientesFechaInicial= "";
    var OCClientesFechaFinal = "";
    var OCProveedorFechaInicial = "";
    var OCProveedorFechaFinal = "";
    // #endregion

    // #rewgion DOM: Estado comercial
    const countRegistradas = document.getElementById("countRegistradas");
    const countEnProceso = document.getElementById("countEnProcseo");
    const countPostVenta = document.getElementById("countPostVenta");

    const countSinAbonos = document.getElementById("countSinAbonos");
    const countSinFactura = document.getElementById("countSinFactura");
    const countEnLogistica = document.getElementById("countEnLogistica");

    const count2Dias = document.getElementById("count2Dias");
    const count5dias = document.getElementById("count5dias");
    const count7dias = document.getElementById("count7dias");

    const tarjetaOCCliente = document.getElementById("tarjetaOCCliente");
    const tarjetaOCProveedores = document.getElementById("tarjetaOCProveedores");
    const tarjetaCotizacionesEnviadas = document.getElementById("tarjetaCotizacionesEnviadas");


    // #endregion

    // #region DOM: Req en proceso de cotización
    const countReqPendientes = document.getElementById("countReqPendientes");

    const divReqPendientes = document.getElementById("divReqPendientes");
    // #endregion

    // #region Eventos: 

    tarjetaOCCliente.addEventListener("click",function(){
        localStorage.removeItem("comercialOCClientes_Traza");
        localStorage.setItem("comercial_OCClientes_FechaInicial",OCClientesFechaInicial);
        localStorage.setItem("comercial_OCClientes_FechaFinal",OCClientesFechaFinal);
        localStorage.setItem("comercial_OCClientes_Estado","Estado:0;1;3");
        window.location.href = "./Comercial/OCClientes.html";
    });

    tarjetaOCProveedores.addEventListener('click',function(){

        if( OCProveedorFechaInicial === "1970-01-01"){ 
            variablesLocalesOCProveedoresEnCero();
        } else {
            variablesLocalesOCProveedoresConFecha();
        }
        window.location.href = "./Comercial/OCProveedores.html";

    });

    tarjetaCotizacionesEnviadas.addEventListener('click',function(){
        const final = formatearFechaComoYYMMDD(new Date());
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
        const inicial = formatearFechaComoYYMMDD(haceUnaSemana);  
        localStorage.setItem("comercial_Cotizaciones_CodReq","Estado:Enviada");
        localStorage.setItem("comercial_Cotizaciones_FechaInicial",inicial);
        localStorage.setItem("comercial_Cotizaciones_FechaFinal",final);

        window.location.href = "./Comercial/Cotizaciones.html";
    });

    // #endregion

    function variablesLocalesOCProveedoresEnCero(){
        localStorage.setItem("comercial_OCProveedores_FechaInicial","");
        localStorage.setItem("comercial_OCProveedores_FechaFinal","");
        localStorage.setItem("comercial_OCProveedores_TRAZA","");
        localStorage.setItem("comercial_OCProveedores_Estado","");
    };

    function variablesLocalesOCProveedoresConFecha(){
        let estadoOCProveedoresFiltro = "";
        localStorage.setItem("comercial_OCProveedores_FechaInicial",OCProveedorFechaInicial);
        localStorage.setItem("comercial_OCProveedores_FechaFinal",OCProveedorFechaFinal);
        localStorage.setItem("comercial_OCProveedores_TRAZA","");
        if( countSinAbonos.textContent !== "0" ){
            estadoOCProveedoresFiltro += "Abono:NO;";
        }
        if( countSinFactura.textContent !== "0" ){
            estadoOCProveedoresFiltro += "Factura:NO;";
        }
        if( countEnLogistica.textContent !== "0" ){
            estadoOCProveedoresFiltro += "Logistica:NO;";
        }
        localStorage.setItem("comercial_OCProveedores_Estado",estadoOCProveedoresFiltro);

    };

    function actualizarDivDashboard(
        datos,
        contenedor,
        urlDestino,
        claveLocalTraza = "",
        contadorElement = null,
        atributoFecha = "dia"
    ) 
    {
        const fechaActual = new Date();
    
        actualizarCount(contadorElement, datos.length);
        limpiarContenido(contenedor);
    
        // Iterar sobre los datos y crear los paneles correspondientes
        datos.forEach(item => {
            const elementoPanel = crearElementoPanelComercial(fechaActual, item, atributoFecha);
            contenedor.insertAdjacentHTML('beforeend', elementoPanel);
        });
    
        agregarEventosInteractividad(contenedor, urlDestino, claveLocalTraza, abrirPaginaComercial);
    }
    

    
    // Función que crea el panel con la información necesaria
    function crearElementoPanelComercial(fechaActual, item, atributoFecha) {
        const colorTexto = determinarColorAPartirDeHoras(fechaActual, item[atributoFecha]);
        const ultimaEdicion = obtenerUltimaEdicion(item.Ediciones);
        
        let fechaUltimaEdicion;
        try {
            fechaUltimaEdicion = convertirFechaISO(ultimaEdicion.fecha) ?? '';
        } catch {
            fechaUltimaEdicion = ultimaEdicion.fecha;
        }
    
        const comentario = `<h6 style="color: ${colorTexto}!important;">${ultimaEdicion.usuario ?? ''} (${fechaUltimaEdicion})</h6>
                            <p style="color: ${colorTexto}!important;">${ultimaEdicion.mensaje}</p>`;
    
        const titulo = `${item['Cod_Req'] ?? ''}: ${item.nombre ?? ''}`;
        const subtitulo = `Registro: ${item.dia}`;
        const info = `${item.cliente ?? ''}<br />${item.contacto ?? ''}<br />${item.email ?? ''}`;
        const toptitulo = `Estado: ${estadosReq[parseInt(item.estado)] }`;
    
        return crearPanel(titulo, subtitulo, info, comentario, item.TRAZA, colorTexto, toptitulo);
    }
    


    // Handle search
    handleData();
    async function handleData(){

        const btnNuevoReq = obtenerElementoPorId('btnNuevoRequerimiento');
        btnNuevoReq.addEventListener('click', irANuevoReq);

        

        // Conseguir datos del back end
        let respuestaRequerimientos = await obtenerData(jsonReqPendientes);
        let requerimientos = respuestaRequerimientos[0].data;

        requerimientos.forEach(requerimiento => {
            requerimiento.id = "divReqPendientes";
        });

        // Llenar los divs del dashboard
        actualizarDivDashboard(respuestaRequerimientos[0].data,divReqPendientes,
            "Comercial/ReqEnProceso.html","ComercialReqEnProceso_Traza",
            countReqPendientes);

        // OC_cliente
        let respuestaEstadoOCCliente = await obtenerData(jsonGetOCClientes);
        let respuestaEstadoOCClienteFecha = await obtenerData(jsonGetOCClientesFechas);
        

        if(respuestaEstadoOCClienteFecha[0].data.length > 0) {
            OCClientesFechaInicial = respuestaEstadoOCClienteFecha[0].data[0]['Fecha Inicial'];
            OCClientesFechaFinal = respuestaEstadoOCClienteFecha[0].data[0]['Fecha Final'];
        };

        respuestaEstadoOCCliente[0].data.forEach(e => {
            switch(e.Estado){
                case "Registrado": countRegistradas.textContent = e.Cantidad; break;
                case "En proceso de entrega": countEnProceso.textContent = e.Cantidad; break;
                case "Servicio post venta": countPostVenta.textContent = e.Cantidad; break;
            }
        }); 

        // OC_proveedor

        let respuestaSPCantidad = await ejecutarSP(null,"dashboardOCProveedorCantidad");
        let respuestaSPFechas = await ejecutarSP(null,"dashboardOCProveedorFechas");

        countSinAbonos.textContent = respuestaSPCantidad[0].data[0]['Numero OCProveedor Sin Abono'];
        countSinFactura.textContent = respuestaSPCantidad[0].data[0]['Numero OCProveedor Sin factura'];
        countEnLogistica.textContent = respuestaSPCantidad[0].data[0]['Numero OCProveedor en logistica'];

        const respuestaSPFechasFiltradas = respuestaSPFechas[0].data.filter(
            item => item["Fecha mínima"] !== null && item["Fecha máxima"] !== null
        );

        const result = respuestaSPFechasFiltradas.reduce((acc, current) => {
            const currentMin = new Date(current["Fecha mínima"]);
            const currentMax = new Date(current["Fecha máxima"]);
        
            return {
                minDate: currentMin < acc.minDate ? currentMin : acc.minDate,
                maxDate: currentMax > acc.maxDate ? currentMax : acc.maxDate
            };
        }, { 
            minDate: new Date(respuestaSPFechasFiltradas.length > 0 ? respuestaSPFechasFiltradas[0]["Fecha mínima"] : null), 
            maxDate: new Date(respuestaSPFechasFiltradas. length > 0 ? respuestaSPFechasFiltradas[0]["Fecha máxima"] : null) 
        });
    
        OCProveedorFechaInicial = formatearFechaComoYYMMDD(result.minDate.toISOString().split("T")[0]);
        OCProveedorFechaFinal = formatearFechaComoYYMMDD(result.maxDate.toISOString().split("T")[0]);

        // COTIZACIONES
        let respuestaEstadoCotizaciones = await obtenerData(jsonGetCotizaciones);

        count2Dias.textContent = respuestaEstadoCotizaciones[0].data[0].Menos_de_2_dias;
        count5dias.textContent = respuestaEstadoCotizaciones[0].data[0].Entre_2_y_5_dias;
        count7dias.textContent = respuestaEstadoCotizaciones[0].data[0].Entre_5_y_7_dias;
                  

    }

});



function abrirPaginaComercial(row){
    const rowComponent = row.querySelector('.deck-title')
    const traza = rowComponent.getAttribute('data-id');
    const estadoUI = rowComponent.getAttribute('data-estado');
    const estado = String(estadoUI).split(':')[1].trim();
    
  
    if(estado === estadosReq[1]){
        irAReqRegistrado(traza);  
    }
    else if(estado === estadosReq[2]){ 
        irAReqConPlanilla(traza);  
    }
    else if(estado === estadosReq[3]){
        irAReqOfertaCompleta(traza);   
    }
}

function irAReqConPlanilla(traza) {
    const url = `Comercial/ReqConPlanilla.html?traza=${encodeURIComponent(traza)}`;
    window.location.href = url;
}

function irAReqRegistrado(traza) {
    const url = `Comercial/ReqRegistrado.html?traza=${encodeURIComponent(traza)}`;
    window.location.href = url;
}
function irAReqOfertaCompleta(traza) {
    const url = `Comercial/ReqOfertasCompletas.html?traza=${encodeURIComponent(traza)}`;
    window.location.href = url;
}

function irANuevoReq(){
    const url = `Comercial/AnadirRequerimientos.html`;
    window.location.href = url;
}
