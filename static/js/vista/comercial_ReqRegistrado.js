import { Informe } from "../componentes/informe/BaseInforme.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { datosGenerales_adjuntos, datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { planilla_codReq, planilla_columnasTodas, tablaMadrePlanilla } from "../modelos/Planilla.js";
import {  obtenerElementoPorId } from "../utils/componentes_utils.js";
import { cambiarAEstado2 } from "../utils/estados_utils.js";

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
            "tabla": tablaMadrePlanilla.alias, 
            "columna": planilla_codReq.nombreEnBD,
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recopPlanilla = new RecopiladorDatos(planilla_columnasTodas,tablaMadrePlanilla,null,detJSONPlanilla)
const abrirModalConfig = {
    btnNuevo: 'btnNuevoProducto',
};
const tablaPlanilla = TablaVistaFabrica.crear(recopPlanilla,abrirModalConfig);



document.addEventListener("DOMContentLoaded", async function () {
    informeInfo.renderizar('infoReq');
    tablaPlanilla.renderizar('tblPlanilla');

    const btnPlanillaCompleta = obtenerElementoPorId('btnPlanillaCompleta');
    btnPlanillaCompleta.addEventListener("click", () => cambiarAEstado2(informeInfo,traza_req) )

});


