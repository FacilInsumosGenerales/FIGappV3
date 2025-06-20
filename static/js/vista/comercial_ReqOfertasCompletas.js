// anadir margen por producto
// anadir la opcion de editar columnas de forma masiva

import { Informe } from "../componentes/informe/BaseInforme.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { cotizacion_codReq, cotizacion_columnasTodas, tablaMadreCotizaciones } from "../modelos/Cotizaciones.js";
import { datosGenerales_adjuntos, datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import {  planilla_columnasTodas, tablaMadrePlanilla } from "../modelos/Planilla.js";
import { obtenerElementoPorId } from "../utils/componentes_utils.js";
import { cambiarAEstado2, cambiarAEstado4 } from "../utils/estados_utils.js";

const parametros = new URLSearchParams(window.location.search);
const traza_req = parametros.get("traza");


// Info general
const columnasInfo = [
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    datosGenerales_contactoCliente,
    datosGenerales_estado,
    datosGenerales_fechaRegistro,
    datosGenerales_adjuntos,
    datosGenerales_prioridad,
    datosGenerales_traza
]
const detJSONInfo = {
    "datosFiltro": [
        {
            "tabla": "daGe",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recopInfo = new RecopiladorDatos(columnasInfo,tablaMadreDatosGenerales, null,detJSONInfo);
const informeInfo = new Informe(recopInfo);


// Productos solicitados
const detJSONPlanilla = {
    "datosFiltro": [
        {
            "tabla": "plan",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recopPlanilla = new RecopiladorDatos(planilla_columnasTodas,tablaMadrePlanilla,null,detJSONPlanilla)
const tablaPlanilla = TablaVistaFabrica.crear(recopPlanilla);


// Cotizaciones
const detJSONCOtizaciones = {
    "datosFiltro": [
        {
            "tabla": tablaMadreCotizaciones.alias,
            "columna": cotizacion_codReq.nombreEnBD,
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recop_cotizaciones = new RecopiladorDatos(cotizacion_columnasTodas,tablaMadreCotizaciones,null,detJSONCOtizaciones)
const tabla_Cotizaciones = TablaVistaFabrica.crear(recop_cotizaciones);




document.addEventListener("DOMContentLoaded", async function () {
    informeInfo.renderizar('infoReq');
    tablaPlanilla.renderizar('tblPlanilla');
    tabla_Cotizaciones.renderizar('tblCotizaciones');


    const btnDevolverCompras = obtenerElementoPorId('btnDevolverCompras');
    btnDevolverCompras.addEventListener("click", () => cambiarAEstado2(informeInfo,traza_req));

    const btnReqCompleto = obtenerElementoPorId('btnReqCompleto');
    btnReqCompleto.addEventListener("click", () => cambiarAEstado4(informeInfo));

    const btnNuevaCotizacion = obtenerElementoPorId('btnNuevaCotizacion');
    btnNuevaCotizacion.addEventListener("click",irANuevaCotizacion );
});

//doble click en fila abre la pagina para editar cotizaciones
// Nueva edicion abre la pagina de ediciones vacia
function irANuevaCotizacion() {
    const cantidad = 2;
    const url = `EditarCotizaciones.html?traza=${encodeURIComponent(traza_req)}&cantidad=${encodeURIComponent(cantidad)}`;
    window.location.href = url;
}