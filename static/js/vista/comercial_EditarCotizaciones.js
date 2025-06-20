import { Columna } from "../componentes/Columna.js";
import { Informe } from "../componentes/informe/BaseInforme.js";
import { Formulario } from "../componentes/informe/Formulario.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { SuministradorDatos } from "../componentes/SuministradorDatos.js";
import { tipoDeCambio } from "../data/estados_data.js";
import { PlantillaPDFFabrica } from "../fabricas/PlantillaPDFFabrica.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { contacto_apellido, contacto_celular, contacto_email, contacto_empresa, contacto_nombre, contacto_traza, tablaMadreContactos } from "../modelos/Contactos.js";
import { cotizacion_codReq, cotizacion_columnasTodas, cotizacion_moneda, cotizacion_numero, cotizacion_traza, tablaMadreCotizaciones } from "../modelos/Cotizaciones.js";
import { datosGenerales_adjuntos, datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { empresa_formaPago, empresa_nombre, empresa_ruc, empresa_traza, tablaMadreEmpresas } from "../modelos/Empresas.js";
import { ofertas_columnasTodas, ofertas_moneda, ofertas_traza, tablaMadreOfertas } from "../modelos/Ofertas.js";
import {  planilla_columnasTodas, planilla_traza, tablaMadrePlanilla } from "../modelos/Planilla.js";
import { prodCotizacion_columnasTodas, prodCotizacion_cotizacionCliente, prodCotizacion_cotizacionProveedor, tablaMadreProdCotizacion } from "../modelos/ProdCotizacion.js";
import { prodOferta_columnasCasiTodas, prodOferta_oferta, prodOferta_productoSolicitado, prodOferta_traza, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";
import { alertGeneral } from "../utils/alert_utils.js";
import { obtenerElementoPorId } from "../utils/componentes_utils.js";

const parametros = new URLSearchParams(window.location.search);
const traza_req = parametros.get("traza");

// se repite exactamente de comercial_reqConPlanilla
// Info general
const columnasInfo = [
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    empresa_nombre,
    empresa_ruc,
    empresa_formaPago,
    contacto_nombre,
    contacto_apellido,
    contacto_celular,
    contacto_email,
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
    ],
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreContactos.nombre ,
            "nombreTablaIzquierdaAlias":tablaMadreContactos.alias,
            "nombreTablaDerecha":tablaMadreDatosGenerales.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":contacto_traza.nombreEnBD,
            "campoDerecha":datosGenerales_contactoCliente.nombreEnBD,
        },
        {
            "nombreTablaIzquierda":tablaMadreEmpresas.nombre ,
            "nombreTablaIzquierdaAlias":tablaMadreEmpresas.alias,
            "nombreTablaDerecha":tablaMadreContactos.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":empresa_traza.nombreEnBD,
            "campoDerecha":contacto_empresa.nombreEnBD,
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


// #region Productos encontrados que van a ser cotizados

const prod_precioSoles = new Columna(
    { 
    tablaMadreEnBD: null,
    nombre: "precioSoles",
    nombreEnBD: null,
    nombreUI: "Precio venta en Soles",
    tipo: 'float',
    },
    {
        valueGetter: (params) => {
        const { pOfe_precioVentaUnidad, ofer_moneda } = params.data; 
        // Estos nombres van a cambiar si cambian las clumnas originales :(
        const tipo = tipoDeCambio[ofer_moneda] ?? 1;
        return pOfe_precioVentaUnidad * tipo;
      },
      valueFormatter: (params) => `S/. ${params.value?.toFixed(2) ?? ''}`
    }

);

const prod_margen = new Columna(
    { 
    tablaMadreEnBD: null,
    nombre: "margen",
    nombreEnBD: null,
    nombreUI: "Margen (%)",
    tipo: 'float',
    },
    {
        valueGetter: (params) => {
            const { pOfe_precioVentaUnidad, pOfe_costoUnidad } = params.data;
            if (!pOfe_precioVentaUnidad || !pOfe_costoUnidad) return null;
            return ((pOfe_precioVentaUnidad - pOfe_costoUnidad) / pOfe_precioVentaUnidad) * 100;
          },
          valueFormatter: (params) => params.value != null ? `${params.value.toFixed(2)}%` : ''
        
    }

);

const prod_costoSoles = new Columna(
    { 
    tablaMadreEnBD: null,
    nombre: "costoSoles",
    nombreEnBD: null,
    nombreUI: "Costo en Soles",
    tipo: 'float',
    },
    {
        valueGetter: (params) => {
        const { pOfe_costoUnidad, ofer_moneda } = params.data;
        const tipo = tipoDeCambio[ofer_moneda] ?? 1;
        return pOfe_costoUnidad * tipo;
      },
      valueFormatter: (params) => `S/. ${params.value?.toFixed(2) ?? ''}`
    }

);

const columnas_ProdEncontrados=[
    ofertas_moneda,
    prod_precioSoles,
    prod_costoSoles,
    prod_margen,
    ...prodOferta_columnasCasiTodas,
]


const conector_ProdEncontrados ={
    tablaMadre: 
        {
            columnaLocal: prodOferta_productoSolicitado,
            tablaReferencia: tablaPlanilla,
            columnaReferencia: planilla_traza,
            dependiente:false
        }
}

const detallesJSON_ProdEncontrados= {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreOfertas.nombre ,
            "nombreTablaIzquierdaAlias":tablaMadreOfertas.alias,
            "nombreTablaDerecha":tablaMadreProdOfertas.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":ofertas_traza.nombreEnBD,
            "campoDerecha":prodOferta_oferta.nombreEnBD,
        }
    ]
};
const recopProdEncontrados = new RecopiladorDatos(columnas_ProdEncontrados,tablaMadreProdOfertas,conector_ProdEncontrados,detallesJSON_ProdEncontrados);
const tablaConfig_ProdOfertas = {
    rowSelection: {
        mode: 'multiRow',
    },
}
const tablaProdEncontrados = TablaVistaFabrica.crear(recopProdEncontrados,{abrir:true},tablaConfig_ProdOfertas);


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

// #endregion


// Productos en cotizacion
const traza_cotizacion = parametros.get("cotizacion");

const detJSON_ProdCot = {
    "datosFiltro": [
        {
            "tabla": tablaMadreProdCotizacion.alias,
            "columna": prodCotizacion_cotizacionCliente.nombreEnBD,
            "operacion": "=",
            "comparador": traza_cotizacion?? `('')`,
            "siguienteOperacion": null
        }
    ]
}
const recop_ProdCot = new RecopiladorDatos(prodCotizacion_columnasTodas,tablaMadreProdCotizacion,null,detJSON_ProdCot)
const tabla_ProdCot = TablaVistaFabrica.crear(recop_ProdCot);



document.addEventListener("DOMContentLoaded", async function () {

    await informeInfo.renderizar('infoReq');
    await tablaPlanilla.renderizar('tblPlanilla');

    // No se puede configurar al inicio porque depende del cache guardado en tabla planilla para el codigo
    const formulario_Coti = configurarCotizacion();
    formulario_Coti.renderizar('formularioCotizacion','btnsCotizacion');
    
    tabla_ProdCot.renderizar('tblProductosEnCotizacion');

    await tablaProdEncontrados.renderizar('tblProductosEnOferta');
    tabla_Ofertas.renderizar('tblOfertas');

    const btnAgregarProductos = obtenerElementoPorId('btnAgregarProductos');
    btnAgregarProductos.addEventListener('click', agregarProductosACotizacion);

    const btnPDF = obtenerElementoPorId('btnRgnVP');
    btnPDF.addEventListener('click', () => generarPDF(formulario_Coti));

});


function recargarConTrazaCotizacion(trazaCotizacion){
    const url = `EditarCotizaciones.html?traza=${encodeURIComponent(traza_req)}&cotizacion=${encodeURIComponent(trazaCotizacion)}`;
    window.location.href = url;
}
function regresarAOfertasCompletas(traza){
    const url = `ReqOfertasCompletas.html?traza=${encodeURIComponent(traza)}`;    
    window.location.href = url;
}



// Esta funcion tiene que ser refactorizada!
function configurarCotizacion(){

    let formularioCofig_Coti;
    let detJSON_cotizacion;
    let recopConfig_cotizacion;


    if (traza_cotizacion){
        detJSON_cotizacion = {
            "datosFiltro": [
                {
                    "tabla": tablaMadreCotizaciones.alias,
                    "columna": cotizacion_traza.nombreEnBD,
                    "operacion": "=",
                    "comparador": traza_cotizacion,
                    "siguienteOperacion": null
                }
            ]
        }
        formularioCofig_Coti = {
            modo:'vista',
            columnasEstaticas:[cotizacion_codReq,cotizacion_numero, cotizacion_moneda],
        }
    }
    else{
        detJSON_cotizacion = {
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

        formularioCofig_Coti = {
            modo:'edicion',
            accionBotones: {
                "Guardar": recargarConTrazaCotizacion,
                "Cancelar": regresarAOfertasCompletas
            },
            columnasEstaticas:[cotizacion_codReq,cotizacion_numero],

        };

        recopConfig_cotizacion = {datosNuevos:true}
    }

    // Modificar columna inicial
    const columnas_cotizacion = [...cotizacion_columnasTodas]; 
    const columna = columnas_cotizacion.find(col => col.nombreEnBD === "Numero_de_Cotizacion");

    if (columna) {
        columna.valorPredeterminado = generarCodigoCotizacion(); 
    }

    const recop_Coti = new RecopiladorDatos(columnas_cotizacion, tablaMadreCotizaciones, null, detJSON_cotizacion,recopConfig_cotizacion);

    return new Formulario(recop_Coti, formularioCofig_Coti);

}

function generarCodigoCotizacion() {

    window.cacheReferencias = window.cacheReferencias || {}; 
    const referencia = window.cacheReferencias[datosGenerales_codReq.nombre];
    const codReq = referencia[traza_req]

    const codigoSinGuion = codReq.replace('-', 'R');
    const codigo = codigoSinGuion.substring(3); 
    const cantidad = parametros.get("cantidad");
    const nuevoCodigo = `C${codigo}V${cantidad}`;


    return nuevoCodigo;
}

function agregarProductosACotizacion(){
    if (!traza_cotizacion){
        alertGeneral(
            'No existe una cotizacion', 
            'Es necesario crear una cotización antes de agregar productos');
            return;
    }

    const productosSeleccionados = tablaProdEncontrados.obtenerValoresColumnasDeFilasSeleccionadas(prodOferta_traza.nombre);

    //TODO: filtrar los que tengan la misma moneda

    const infoAGuardar = [
    {
        columna: prodCotizacion_cotizacionProveedor,
        valores: productosSeleccionados
    },
    {
        columna: prodCotizacion_cotizacionCliente,
        valores: [traza_cotizacion]
    }
    ];

    SuministradorDatos.crearNuevosValores(infoAGuardar)

}

async function generarPDF(formulario_Coti){
    // crear
    // guardar
    let pdf = obtenerElementoPorId("pdf");
    const pdfCotizacion = await PlantillaPDFFabrica.crearPlantillaPDF('cotizacion');

    const datosCotizacionPDF = construirDatosPlantillaPDF(formulario_Coti,informeInfo);
    console.log('datos procesados', datosCotizacionPDF);

    // const resultadoPDF = await pdfCotizacion.generarPDF(datosPDF, productosFiltrados);
    // pdfBlobLocal = resultadoPDF.blob;
    //             pdf.src = resultadoPDF.url; // Reemplazar el iframe


    // const nuevoPdfBlobLocal = new File([pdfBlobLocal], nombreCotizacion, { type: pdfBlobLocal.type });
    //             const observaciones = cotizacion_observaciones.value;

}

function construirDatosPlantillaPDF(informeCotizacion, informeReq) {

    const dataCotizacion = informeCotizacion.dataColumnas;
    const dataReq = informeReq.dataColumnas;

    console.log('cotizacion', dataCotizacion);
    console.log('req', dataReq);

    const lugarDespacho = null;

    return {
        cliente: dataReq.empr_nombre || '',
        contactoNombre: dataReq.cont_Nombre || '',
        contactoApellido: dataReq.cont_Apellido || '',
        ruc: dataReq.empr_ruc || '',
        celular: dataReq.cont_Celular || '',
        email: dataReq.cont_Email || '',
        codReq: dataReq.daGe_codReq || '',
        formaPago: dataReq.empr_formaPago || '',

        fecha: dataCotizacion.coti_fecha?.split(' ')[0] || '',
        validez: dataCotizacion.coti_validez || '',
        moneda: dataCotizacion.coti_moneda || '',
        numeroCotizacion: dataCotizacion.coti_numeroCotizacion || '',
        lugarDespacho: lugarDespacho || '',
        observaciones: dataCotizacion.coti_observaciones || '',
    };
}
