import { Informe } from "../componentes/informe/BaseInforme.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { datosGenerales_adjuntos, datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import {  planilla_columnasTodas, tablaMadrePlanilla } from "../modelos/Planilla.js";


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
    datosGenerales_prioridad
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

document.addEventListener("DOMContentLoaded", async function () {
    informeInfo.renderizar('infoReq');
    tablaPlanilla.renderizar('tblPlanilla');
});

// // Historial de la version anterior
//  async function buscarHistorial(){
//         const producto = input_search.value; // Obtener el producto desde el input
//         if(producto != ""){ // Si el input no es vacio
//             // Ingresarlo en el valor del input en el json seguido de dos % % para usar like en la sentencia
//             jsonProductoHistorial.datosFiltro[0].comparador = "'%" + producto + "%'"; 
//             // Obtener los datos e ingresarlos en el historial
//             const respuestaProductoHistorial = await obtenerData(jsonProductoHistorial);
//             llenarComponente(respuestaProductoHistorial[0].data,tblProductosHistorial,"","none");
//             countProdHistorial.textContent = tblProductosHistorial.getData().length;
//         } else { // Si no hay ningun valor en el input
//             tblProductosHistorial.clearData(); // Limpiar la tabla historial
//         }
//     };