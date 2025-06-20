import { Informe } from "../componentes/informe/BaseInforme.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { datosGenerales_adjuntos, datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { ofertas_columnasTodas, ofertas_traza, tablaMadreOfertas } from "../modelos/Ofertas.js";
import {  planilla_columnasTodas, planilla_traza, tablaMadrePlanilla } from "../modelos/Planilla.js";
import { prodOferta_columnasCasiTodas, prodOferta_oferta, prodOferta_productoSolicitado, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";
import {  obtenerElementoPorId } from "../utils/componentes_utils.js";
import { cambiarAEstado1, cambiarAEstado3 } from "../utils/estados_utils.js";

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



const conector_ProdEncontrados ={
    tablaMadre: 
        {
            columnaLocal: prodOferta_productoSolicitado,
            tablaReferencia: tablaPlanilla,
            columnaReferencia: planilla_traza,
            dependiente:false
        }
}
const recopProdEncontrados = new RecopiladorDatos(prodOferta_columnasCasiTodas,tablaMadreProdOfertas,conector_ProdEncontrados);
const tablaProdEncontrados = TablaVistaFabrica.crear(recopProdEncontrados);


const conector_Ofertas ={
    tablaMadre: 
        {
            columnaLocal: ofertas_traza,
            tablaReferencia: tablaProdEncontrados,
            columnaReferencia: prodOferta_oferta,
            dependiente:false
        }
}
const recop_Ofertas = new RecopiladorDatos(ofertas_columnasTodas,tablaMadreOfertas,conector_Ofertas);
const tabla_Ofertas = TablaVistaFabrica.crear(recop_Ofertas);

// los productos cuando se editan solo pueden ser del requerimiento que se esta editando

document.addEventListener("DOMContentLoaded", async function () {
    informeInfo.renderizar('infoReq');
    await tablaPlanilla.renderizar('tblPlanilla');
    await tablaProdEncontrados.renderizar('tblProductosEnOferta');
    tabla_Ofertas.renderizar('tblOfertas')

    const btnHistorial = obtenerElementoPorId('btnNuevoProdHistorial');
    btnHistorial.addEventListener('click',irAHistorial);

    const btnOfertas = obtenerElementoPorId('btnNuevoProdOferta');
    btnOfertas.addEventListener('click',irAOfertas);
    
    const btnPlanillaIncompleta = obtenerElementoPorId('btnPlanillaIncompleta');
    btnPlanillaIncompleta.addEventListener("click", () => cambiarAEstado1(informeInfo,traza_req))

    const btnOfertasCompletas = obtenerElementoPorId('btnOfertasCompletas');
    btnOfertasCompletas.addEventListener("click", () => cambiarAEstado3(informeInfo,traza_req))
});


function irAHistorial() {
    const url = `Historial.html?traza=${encodeURIComponent(traza_req)}`;
    window.location.href = url;
}

function irAOfertas() {
    const valoresPlanilla = tablaPlanilla.obtenerValoresTodasFilas(planilla_traza.nombre); // <- Set
    const valoresComoArray = Array.from(valoresPlanilla); 
    const valoresComoString = JSON.stringify(valoresComoArray); 

    const url = `AnadirOfertas.html?planilla=${encodeURIComponent(valoresComoString)}`;
    window.location.href = url;
}


