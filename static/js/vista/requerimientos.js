import { Buscador } from "../componentes/Buscador.js";
import { Columna } from "../componentes/Columna.js";
import { Formulario } from "../componentes/informe/Formulario.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { InformeFormularioFabrica } from "../fabricas/InformeFormularioFabrica.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { comprobante_columnasTodas, comprobante_OCCliente, comprobante_Proveedor, comprobante_traza, tablaMadreComprobante } from "../modelos/Comprobante.js";
import { cotizacion_columnasTodas, cotizacion_traza, tablaMadreCotizaciones } from "../modelos/Cotizaciones.js";
import { datosGenerales_codReq, datosGenerales_columnasTodas, datosGenerales_estado, datosGenerales_nombreProducto, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { guias_columnasTodas, guias_OCClienteTRAZA, tablaMadreGuias } from "../modelos/Guias.js";
import { movimiento_columnasTodas, tablaMadreMovimientosBancarios } from "../modelos/MovBancarios.js";
import { ocCliente_columnasTodas, ocCliente_numeroCotizacion, ocCliente_traza, tablaMadreOcClientes } from "../modelos/OCCliente.js";
import { ocProveedor_columnasTodas, ocProveedor_traza, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { ofertas_columnasTodas, ofertas_traza, tablaMadreOfertas } from "../modelos/Ofertas.js";
import { pago_comprobante, pago_movimiento, tablaMadrePagosRelacionados } from "../modelos/PagosRel.js";
import { planilla_codReq, planilla_columnasTodas, planilla_traza, tablaMadrePlanilla } from "../modelos/Planilla.js";
import { prodCotizacion_cotizacionCliente, prodCotizacion_cotizacionProveedor, tablaMadreProdCotizacion } from "../modelos/ProdCotizacion.js";
import { prodOcProv_ocProveedor, prodOcProv_productoCotizado, tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";
import { prodOferta_columnasCasiTodas, prodOferta_oferta, prodOferta_productoSolicitado, prodOferta_traza, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";

const buscador = new Buscador(-1);




// Requerimiento sp
const req_numCotiEnviadas = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "numCotEnviada",
    nombreEnBD: "Numero_cotizaciones_enviadas",
    nombreUI: "Número de cotizaciones enviadas",
    tipo: 'int'
});
const req_numOCRecibidas = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "numCotEnviada",
    nombreEnBD: "Numero_OC_recibidas",
    nombreUI: "Número de OCs recibidas",
    tipo: 'int'
});
const req_porcFactEnviadas = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "numOCRecibidas",
    nombreEnBD: "Facturas_enviadas",
    nombreUI: "Facturas enviadas (%)",
    tipo: 'percent'
});
const req_porcFactRecibidas = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "porcFactRecibidas",
    nombreEnBD: "Facturas_recibidas_de_proveedores",
    nombreUI: "Facturas recibidas (%)",
    tipo: 'percent'
});
const req_porcPagosClientes = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "porcPagosClientes",
    nombreEnBD: "Pagos_de_clientes",
    nombreUI: "Pagos a clientes (%)",
    tipo: 'percent'
});
const req_porcPagosProveedores = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "porcPagosProveedores",
    nombreEnBD: 'Pagos_a_proveedores', 
    nombreUI: "Pagos a proveedores (%)",
    tipo: 'percent'
});
const req_porcguiasEnviadas = new Columna({ 
    tablaMadreEnBD: null, // Columna virtual
    nombre: "porcguiasEnviadas",
    nombreEnBD: "Guias_firmadas",
    nombreUI: "Guías firmadas (%)",
    tipo: 'percent'
});

const columnas_Req = [
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    datosGenerales_traza,
    datosGenerales_estado,
    req_numCotiEnviadas,
    req_numOCRecibidas,
    req_porcFactEnviadas,
    req_porcFactRecibidas,
    req_porcPagosClientes,
    req_porcPagosProveedores,
    req_porcguiasEnviadas
]


const recop_Req = new RecopiladorDatos(columnas_Req, tablaMadreDatosGenerales,{buscador:buscador},{},{procedimientoAlmacenado:"reqReport"})

const tabla_Req = TablaVistaFabrica.crear(recop_Req);


// Info
const conector_infoReq =  {
    tablaMadre: 
    {
        columnaLocal: datosGenerales_traza,
        tablaReferencia: tabla_Req,
        columnaReferencia: datosGenerales_traza
    }
};
const recop_infoReq = new RecopiladorDatos(datosGenerales_columnasTodas,tablaMadreDatosGenerales,conector_infoReq)
const formulario_infoReq = InformeFormularioFabrica.crear(recop_infoReq,{modo:'vista'}) 




// Planilla
const conector_planilla =  {
    tablaMadre: 
    {
        columnaLocal: planilla_codReq,
        tablaReferencia: tabla_Req,
        columnaReferencia: datosGenerales_traza
    }
};
const recop_planilla = new RecopiladorDatos(planilla_columnasTodas,tablaMadrePlanilla,conector_planilla)
const tabla_planilla = TablaVistaFabrica.crear(recop_planilla);

// productos en ofertas / BD de cotizaciones de proveedores
const conector_prodOfertas =  {
    tablaMadre: 
    {
        columnaLocal: prodOferta_productoSolicitado,
        tablaReferencia: tabla_planilla,
        columnaReferencia: planilla_traza,
        dependiente: false
    }
};
const recop_prodOfertas = new RecopiladorDatos(prodOferta_columnasCasiTodas,tablaMadreProdOfertas,conector_prodOfertas);
const tabla_prodOfertas = TablaVistaFabrica.crear(recop_prodOfertas);

// Ofertas
const conector_ofertas = {
    tablaMadre: 
    {
        columnaLocal: ofertas_traza,
        tablaReferencia: tabla_prodOfertas,
        columnaReferencia: prodOferta_oferta,
        dependiente: false
    }
};
const recop_ofertas = new RecopiladorDatos(ofertas_columnasTodas, tablaMadreOfertas,conector_ofertas );
const tabla_ofertas = TablaVistaFabrica.crear(recop_ofertas);

//Cotizacines
const columnas_cotizaciones =[
    ...cotizacion_columnasTodas,
    prodCotizacion_cotizacionProveedor
]
const conector_cotizaciones = {
    tablaMadre: 
    {
        columnaLocal: prodCotizacion_cotizacionProveedor,
        tablaReferencia: tabla_prodOfertas,
        columnaReferencia: prodOferta_traza,
        dependiente: false
    }
};
const detallesJSON_cotizaciones =  {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreProdCotizacion.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdCotizacion.alias,
            "nombreTablaDerecha":tablaMadreCotizaciones.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":prodCotizacion_cotizacionCliente.nombreEnBD,
            "campoDerecha":"TRAZA",
        }
    ],
    "groupby": [
        {
            "tabla":tablaMadreCotizaciones.alias,
            "columna": "TRAZA",
        }
    ]
}
const recop_cotizaciones = new RecopiladorDatos(columnas_cotizaciones,tablaMadreCotizaciones,conector_cotizaciones,detallesJSON_cotizaciones);
const tabla_cotizaciones = TablaVistaFabrica.crear(recop_cotizaciones);


// OC clientes
const conector_ocClientes = {
    tablaMadre: 
    {
        columnaLocal: ocCliente_numeroCotizacion,
        tablaReferencia: tabla_cotizaciones,
        columnaReferencia: cotizacion_traza,
        dependiente: false
    }
};
const recop_ocClientes = new RecopiladorDatos(ocCliente_columnasTodas,tablaMadreOcClientes,conector_ocClientes);
const tabla_ocClientes = TablaVistaFabrica.crear(recop_ocClientes);


// Guias 
const conector_guias = {
    tablaMadre: 
    {
        columnaLocal: guias_OCClienteTRAZA,
        tablaReferencia: tabla_ocClientes,
        columnaReferencia: ocCliente_traza,
        dependiente: false
    }
};
const recop_guias = new RecopiladorDatos(guias_columnasTodas,tablaMadreGuias,conector_guias);
const tabla_guias = TablaVistaFabrica.crear(recop_guias);


//oc proveedores
const columnas_ocProveedores =[
    ...ocProveedor_columnasTodas,
    prodOcProv_productoCotizado
]
const conector_ocProveedores = {
    tablaMadre: 
    {
        columnaLocal: prodOcProv_productoCotizado,
        tablaReferencia: tabla_prodOfertas,
        columnaReferencia: prodOferta_traza,
        dependiente: false
    }
};
const detallesJSON_ocProveedores =  {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreProdOcProv.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdOcProv.alias,
            "nombreTablaDerecha":tablaMadreOcProveedores.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":prodOcProv_ocProveedor.nombreEnBD,
            "campoDerecha":"TRAZA",
        }
    ],
    "groupby": [
        {
            "tabla":tablaMadreOcProveedores.alias,
            "columna": "TRAZA",
        }
    ]
}
const recop_ocProveedores = new RecopiladorDatos(columnas_ocProveedores,tablaMadreOcProveedores,conector_ocProveedores,detallesJSON_ocProveedores);
const tabla_ocProveedores = TablaVistaFabrica.crear(recop_ocProveedores);


//comprobantes clientes
const conector_comprobantesClientes = {
    tablaMadre: 
    {
        columnaLocal: comprobante_OCCliente,
        tablaReferencia: tabla_ocClientes,
        columnaReferencia: ocCliente_traza,
        dependiente: false
    }
};
const recop_comprobantesClientes = new RecopiladorDatos(comprobante_columnasTodas,tablaMadreComprobante,conector_comprobantesClientes);
const tabla_comprobantesClientes = TablaVistaFabrica.crear(recop_comprobantesClientes);

// abonos clientes
const columnas_abonos =[
    ...movimiento_columnasTodas,
    pago_comprobante
]
const conector_abonosClientes = {
    tablaMadre: 
    {
        columnaLocal: pago_comprobante,
        tablaReferencia: tabla_comprobantesClientes,
        columnaReferencia: comprobante_traza,
        dependiente: false
    }
};
const detallesJSON_abonos =  {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadrePagosRelacionados.nombre,
            "nombreTablaIzquierdaAlias":tablaMadrePagosRelacionados.alias,
            "nombreTablaDerecha":tablaMadreMovimientosBancarios.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":pago_movimiento.nombreEnBD,
            "campoDerecha":"TRAZA",
        }
    ],
    "groupby": [
        {
            "tabla":tablaMadreMovimientosBancarios.alias,
            "columna": "TRAZA",
        }
    ]
}
const recop_abonosClientes = new RecopiladorDatos(columnas_abonos,tablaMadreMovimientosBancarios,conector_abonosClientes,detallesJSON_abonos);
const tabla_abonosClientes = TablaVistaFabrica.crear(recop_abonosClientes);




//comprobantes proveedores
const conector_comprobantesProveedores = {
    tablaMadre: 
    {
        columnaLocal: comprobante_Proveedor,
        tablaReferencia: tabla_ocProveedores,
        columnaReferencia: ocProveedor_traza,
        dependiente: false
    }
};
const recop_comprobantesProveedores = new RecopiladorDatos(comprobante_columnasTodas,tablaMadreComprobante,conector_comprobantesProveedores);
const tabla_comprobantesProveedores = TablaVistaFabrica.crear(recop_comprobantesProveedores);


// abonos proveedores

const conector_abonosProveedores = {
    tablaMadre: 
    {
        columnaLocal: pago_comprobante,
        tablaReferencia: tabla_comprobantesProveedores,
        columnaReferencia: comprobante_traza,
        dependiente: false
    }
};
const recop_abonosProveedores = new RecopiladorDatos(columnas_abonos,tablaMadreMovimientosBancarios,conector_abonosProveedores,detallesJSON_abonos);
const tabla_abonosProveedores = TablaVistaFabrica.crear(recop_abonosProveedores);


// Esto se puede convertir en procesos separados independientes
$(document).ready(async function(){
    buscador.renderizar();
    await tabla_Req.renderizar("tblReq");
    formulario_infoReq.renderizar('inforReq','btnsInfoReq');


    await tabla_planilla.renderizar("tblPlanilla");
    await tabla_prodOfertas.renderizar("tblProdEnOfertas");
    tabla_ofertas.renderizar("tblOfertas");


    // depende de tabla prod_ofertas y luego una de las otras como se indica 
    await tabla_ocProveedores.renderizar("tblOcProveedores"); 
    await tabla_comprobantesProveedores.renderizar("tblFacturasProveedores");
    tabla_abonosProveedores.renderizar( "tblAbonosProveedores");


    // depende de tabla prod_ofertas y luego una de las otras como se indica 
    await tabla_cotizaciones.renderizar("tblCotizaciones");
    await tabla_ocClientes.renderizar("tblOcClientes");
    tabla_guias.renderizar("tblGuias");
    await tabla_comprobantesClientes.renderizar("tblfacturasClientes");
    tabla_abonosClientes.renderizar("tblAbonosClientes");
   
    
});