import { customProgressFormatter, formateadorDeFechas, prepTabulator } from "../utils/tabulator_utils.js";
import { convertirCeldaALink } from "../utils/utils.js";
import { estadosReq } from "./estados_data.js";

// Tablas
export const tblReqOptions = prepTabulator([
    { title: "Cod_Req" , field: 'Cod_Req'},
    { title: "Nombre" , field: 'Nombre_del_producto'},
    { title: "TRAZA" , field: 'TRAZA'},
    { title: "Estado" , field: 'Estado',
        formatter: function(cell) {
            let value = cell.getValue();
            return estadosReq[value] ? `${value}. ${estadosReq[value]}` : value; 
        }},
    { title: "Adjuntos" , field: 'Adjuntos', visible: false},
    { title: "Lugar_de_entrega_al_cliente" , field: 'Lugar_de_entrega_al_cliente', visible: false},
    { title: "Contacto_cliente_traza" , field: 'Contacto_cliente_traza', visible: false},
    { title: "contacto" , field: 'contacto', visible: false},
    { title: "empresa_traza" , field: 'empresa_traza', visible: false},
    { title: "Ediciones" , field: 'Ediciones', visible: false},
    { title: "Numero_cotizaciones_enviadas" , field: 'Numero_cotizaciones_enviadas'},
    { title: "Numero_OC_recibidas" , field: 'Numero_OC_recibidas'},
    { title: "Facturas_recibidas_de_proveedores" , field: 'Facturas_recibidas_de_proveedores',
        formatter: (cell) => {
        return customProgressFormatter(cell, 'Numero_OC_recibidas');
    }, hozAlign:"center"},
    { title: "Pagos a proveedores" , field: 'Pagos_de_clientes', 
        formatter: (cell) => {
            return customProgressFormatter(cell, 'Numero_OC_recibidas');
    }, hozAlign:"center"},
    { title: "Guías firmadas" , field: 'Guias_firmadas', 
        formatter: (cell) => {
            return customProgressFormatter(cell, 'Numero_OC_recibidas');
    }, hozAlign:"center"},
    { title: "Facturas_enviadas" , field: 'Facturas_enviadas',
        formatter: (cell) => {
        return customProgressFormatter(cell, 'Numero_OC_recibidas');
    }, hozAlign:"center"},
    { title: "Pagos_de_clientes" , field: 'Pagos_de_clientes', 
        formatter: (cell) => {
        return customProgressFormatter(cell, 'Numero_OC_recibidas');
    }, hozAlign:"center"}
],false,1); //'#tblReq'

export var tblHistorialOptions = prepTabulator([
    { title: "mensaje" , field: 'mensaje', formatter: "textarea" },
    { title: "nombreTabla" , field: 'nombreTabla', visible:false },
    { title: "TRAZA" , field: 'TRAZA', visible:false },
    { title: "elemento" , field: 'elemento', visible:false },
],true,1,"nombreTabla"); //'#tblHistorial', 

export const tblPlanillaOptions = prepTabulator([
    { title: "Cod_Req" , field: 'Cod_Req'},
    { title: "Grupo" , field: 'Grupo'},
    { title: "Categoria" , field: 'Categoria'},
    { title: "Producto_Solicitado" , field: 'Producto_Solicitado', formatter: "textarea"},
    { title: "Marca" , field: 'Marca'},
    { title: "Modelo" , field: 'Modelo'},
    { title: "Medida" , field: 'Medida'},
    { title: "Cantidad" , field: 'Cantidad'},
    { title: "Ediciones" , field: 'Ediciones', visible:false},
    { title: "TRAZA " , field: 'TRAZA'},
],false,1); //'#tblPlanilla', 

export const tblOfertasOptions = prepTabulator([
    { title: "TRAZA" , field: 'TRAZA', },
    { title: "Empresa" , field: 'Empresa' },
    { title: "Contacto" , field: 'Contacto' },
    { title: "Adjunto" , field: 'Adjunto', formatter: function(cell){
        return convertirCeldaALink(cell);
    } },
    { title: "Fecha_de_Registro" , field: 'Fecha_de_Registro', 
        formatter: formateadorDeFechas
    },
    { title: "Ediciones" , field: 'Ediciones', visible: false}
],false,1);//'#tblOfertas', 

export const tblCotizacionesOptions = prepTabulator([
    { title: "Cod_Req" , field: 'Cod_Req', },
    { title: "Numero_de_Cotizacion" , field: 'Numero_de_Cotizacion' },
    { title: "Valor_de_venta" , field: 'Valor_de_venta'},
    { title: "IGV" , field: 'IGV'},
    { title: "Fecha" , field: 'Fecha', 
        formatter: formateadorDeFechas
    },
    { title: "Validez" , field: 'Validez'},
    { title: "Enviada" , field: 'Enviada'},
    { title: "Archivo" , field: 'Archivo'},
    { title: "Adjuntos" , field: 'Adjuntos'},
    { title: "Estado" , field: 'Estado'},
    { title: "Ediciones" , field: 'Ediciones', visible:false},
    { title: "TRAZA" , field: 'TRAZA'},
],false,1);//'#tblCotizaciones', 

export const tblOCClientesOptions = prepTabulator([
    { title: "Numero_de_Cotizacion" , field: 'Numero_de_Cotizacion', },
    { title: "Numero_OC_Cliente" , field: 'Numero_OC_Cliente' },
    { title: "Estado" , field: 'Estado'},
    { title: "Valor_sin_IGV" , field: 'Valor_sin_IGV'},
    { title: "IGV" , field: 'IGV'},
    { title: "Fecha_Emision" , field: 'Fecha_Emision', 
        formatter: formateadorDeFechas
    },
    { title: "OC_Cliente_PDF" , field: 'OC_Cliente_PDF'},
    { title: "Ediciones" , field: 'Ediciones', visible:false},
    { title: "TRAZA" , field: 'TRAZA'},
],false,1);//'#tblOCClientes', 

export const tblOCProveedoresOptions = prepTabulator([
    { title: "TRAZA" , field: 'TRAZA'},
    { title: "No_Orden_de_Compra" , field: 'No_Orden_de_Compra', },
    { title: "Proveedor" , field: 'Proveedor' },
    { title: "Estado" , field: 'Estado'},
    { title: "Moneda" , field: 'Moneda'},
    { title: "Valor_de_compra" , field: 'Valor_de_compra'},
    { title: "IGV" , field: 'IGV'},
    { title: "Lugar_de_entrega" , field: 'Lugar_de_entrega'},
    { title: "Fecha de vencimiento 1" , field: 'Fecha de vencimiento 1', 
        formatter: formateadorDeFechas
    },
    { title: "Fecha de vencimiento 2" , field: 'Fecha de vencimiento 2', 
        formatter: formateadorDeFechas
    },
    { title: "Garantia" , field: 'Garantia'},
    { title: "OC_pdf" , field: 'OC_pdf'},
    { title: "Fecha_Pedido" , field: 'Fecha_Pedido', 
        formatter: formateadorDeFechas
    },
    { title: "OC_entregada" , field: 'OC_entregada'},
    { title: "Orden_Generada" , field: 'Orden_Generada'},
    { title: "Fecha_actualizacion" , field: 'Fecha_actualizacion', 
        formatter: formateadorDeFechas
    },
    { title: "Contador" , field: 'Contador'},
    { title: "Ediciones" , field: 'Ediciones', visible:false},
],false,1);//'#tblOCProveedores', 

export const tblFacturasOptions = prepTabulator([
    { title: "Tipo" , field: 'Tipo', },
    { title: "Categoria" , field: 'Categoria' },
    { title: "Proveedor" , field: 'Proveedor'},
    { title: "OC_proveedor" , field: 'OC_proveedor'},
    { title: "OC_cliente" , field: 'OC_cliente'},
    { title: "Descripcion" , field: 'Descripcion'},
    { title: "Numero_de_documento" , field: 'Numero_de_documento'},
    { title: "Fecha_Emision" , field: 'Fecha_Emision', 
        formatter: formateadorDeFechas
    },
    { title: "Fecha_registro OC", field: "Fecha_registro", 
        formatter: formateadorDeFechas
    },
    { title: "Fecha_Vencimiento" , field: 'Fecha_Vencimiento', 
        formatter: formateadorDeFechas
    },
    { title: "Fecha_de_Envio" , field: 'Fecha_de_Envio', 
        formatter: formateadorDeFechas
    },
    { title: "Valor_sin_IGV" , field: 'Valor_sin_IGV'},
    { title: "IGV" , field: 'IGV'},
    { title: "Moneda" , field: 'Moneda'},
    { title: "Saldo" , field: 'Saldo'},
    { title: "Documento_PDF" , field: 'Documento_PDF'},
    { title: "Ediciones" , field: 'Ediciones', visible:false},
    { title: "TRAZA" , field: 'TRAZA', visible:false}
],false,1);//'#tblFacturas', 

export const tblAbonosOptions = prepTabulator([
    { title: "OCProveedor_TRAZA", field:"OCProveedor_TRAZA"},
    { title: "OCProveedor Fecha", field:"OCProveedor Fecha"},
    { title: "Categoria" , field: 'Categoria', },
    { title: "Fecha" , field: 'Fecha',
        formatter: formateadorDeFechas
     },
    { title: "Valor" , field: 'Valor'},
    { title: "Moneda" , field: 'Moneda'},
    { title: "Concepto" , field: 'Concepto', formatter:'textarea'},
    { title: "Archivo" , field: 'Archivo'},
    { title: "Banco" , field: 'Banco'},
    { title: "No_Operacion_Bancaria" , field: 'No_Operacion_Bancaria'},
    { title: "Ediciones" , field: 'Ediciones'},
    { title: "TRAZA" , field: 'TRAZA', visible:false}
],false,1);//'#tblAbonos', 

export const tblGuiasOptions = prepTabulator([
    { title: "OC_de_cliente" , field: 'OC_de_cliente', },
    { title: "Numero_Guia" , field: 'Numero_Guia' },
    { title: "Guia_sin_firma_PDF" , field: 'Guia_sin_firma_PDF'},
    { title: "Guia_firmada_PDF" , field: 'Guia_firmada_PDF'},
    { title: "Ediciones" , field: 'Ediciones', visible: false},
    { title: "TRAZA" , field: 'TRAZA'},
    { title: "Fecha_Emision" , field: 'Fecha_Emision',
        formatter: formateadorDeFechas
     }
],false,1); //'#tblGuias'

// JSON
export const jsonPostRequerimientos = {
    "nombreTabla": "datos_generales_del_proceso a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Submission_Date",
            "operacion": "between",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }],
};

// Generar cotizaciones
export var jsonPutRequerimiento = {
    "nombreTabla": "datos_generales_del_proceso",	
    "informacionColumnas": 
        {
            "Nombre_del_producto": null,
            "Estado": null,
            "Contacto_cliente": null,
            "Lugar_de_entrega_al_cliente": null,
            "Ediciones": null,
        }
    ,
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "datos_generales_del_proceso",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export var jsonPutImagenes = {

    "nombreTabla": "datos_generales_del_proceso",	
    "informacionColumnas": {
        "Adjunto": null,
        "actualizar_adjunto":"data"
    },
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

export const jsonGetPlanilla = {
    "nombreTabla": "planilla a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};

export const jsonGetOfertaProveedor = {
    "nombreTabla": "cotizaciones_proveedores a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA": null,
        "a.Adjunto": null,
        "a.Fecha_de_Registro": null,
        "a.Moneda": null,
        "empresas.Nombre AS Empresa" : null,
        "contactos.Nombre AS Contacto": null ,
        "a.Ediciones": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"Cotizacion",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"planilla",
            "nombreTablaDerecha":"bd_cotizaciones_de_proveedores",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_Solicitado"
        },
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Contacto_proveedor"
        },
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"contactos",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Empresa"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "planilla",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }],
    "groupby": [{
        "tabla": "a",
        "columna": "TRAZA"
    }],
};

export const jsonGetCotizacionesClientes = {
    "nombreTabla": "datos_generales_de_cotizaciones a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};

export const jsonGetOCClientes = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null
    },
    "tablaJoins": [
        {
        "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
        "nombreTablaDerecha":"a",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Numero_de_Cotizacion"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "datos_generales_de_cotizaciones",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};

export const jsonGetOCProveedores = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        //datos propios
        "DISTINCT (a.TRAZA) AS 'TRAZA'": null,
        "a.No_Orden_de_Compra": null,
        "a.Estado": null,
        "a.Moneda": null,
        "a.Valor_de_compra": null,
        "a.IGV": null,
        "a.Lugar_de_entrega": null,
        "a.`Garantia`": null,
        "a.OC_pdf": null,
        "a.OC_entregada": null,
        "a.Ediciones": null,
        "a.Proveedor": null,
        "a.Observaciones": null,
        "a.Fecha_actualizacion": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"productos_en_oc_proveedor",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
        {
            "nombreTablaIzquierda":"planilla",
            "nombreTablaDerecha":"bd_cotizaciones_de_proveedores",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_Solicitado"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "planilla",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ]
};

export const jsonGetFacturas = {
    "nombreTabla": "comprobantes_de_pago a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null,
        "COALESCE(datos_generales_orden_compra_a_proveedores.Fecha_actualizacion,'Sin fecha') AS 'Fecha_registro'": null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"datos_generales_ocs_clientes",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_cliente"
        },
        {
            "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
            "nombreTablaDerecha":"datos_generales_ocs_clientes",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Numero_de_Cotizacion"
        },
        {
            "nombreTablaIzquierda":"datos_generales_orden_compra_a_proveedores",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_proveedor"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "datos_generales_de_cotizaciones",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};

export const jsonGetAbono = {
    "nombreTabla": "movimientos_bancarios a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null,
        "COALESCE(datos_generales_orden_compra_a_proveedores.TRAZA,'SIN TRAZA EN OCPROVEEDOR') AS 'OCProveedor_TRAZA'": null,
        "COALESCE(datos_generales_orden_compra_a_proveedores.Fecha_actualizacion,'SIN FECHA EN OCPROVEEDOR') AS 'OCProveedor Fecha'": null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"pagos_relacionados",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Movimiento",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"comprobantes_de_pago",
            "nombreTablaDerecha":"pagos_relacionados",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Comprobante"
        },
        {
            "nombreTablaIzquierda":"datos_generales_orden_compra_a_proveedores",
            "nombreTablaDerecha":"comprobantes_de_pago",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_proveedor"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "pagos_relacionados",
            "columna": "Comprobante",
            "operacion": "IN",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};

export const jsonGetGuia = {
    "nombreTabla": "guias_emitidas a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"datos_generales_ocs_clientes",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_de_cliente"
        },
        {
            "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
            "nombreTablaDerecha":"datos_generales_ocs_clientes",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Numero_de_Cotizacion"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "datos_generales_de_cotizaciones",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador":  null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [{
        "tabla" : "a",
        "columna" : "TRAZA",
        "orden" : "DESC"
    }]
};
