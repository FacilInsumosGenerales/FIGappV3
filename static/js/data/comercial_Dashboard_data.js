// JSON
export var jsonReqPendientes = {
    "nombreTabla": "datos_generales_del_proceso",	
    "informacionColumnas": {
        "Submission_Date AS dia":null,
        "datos_generales_del_proceso.TRAZA":null,
        "Cod_Req":null,
        "Nombre_del_producto AS nombre":null,
        "datos_generales_del_proceso.Ediciones":null,
        "contactos.Nombre AS contacto":null,
        "empresas.Nombre AS cliente":null,
        "datos_generales_del_proceso.Estado AS estado": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaDerecha":"datos_generales_del_proceso",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Contacto_Cliente"
        },
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"contactos",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Empresa"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "datos_generales_del_proceso",
            "columna": "Estado",
            "operacion": "in",
            "comparador": "('1','2','3')",
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "datos_generales_del_proceso",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ]
};
// #region JSON: OC_cliente

// Cantidad
export var jsonGetOCClientes = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        "COUNT(a.Estado) AS Cantidad":null,
        "CASE WHEN Estado = 0 THEN 'Registrado' WHEN Estado = 1 THEN 'En proceso de entrega' WHEN Estado = 3 THEN 'Servicio post venta' END AS Estado": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Estado",
            "operacion": "IN",
            "comparador": "(0,1,3)",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [
        {
            "tabla": "a",
            "columna": "Estado",
        }
    ],
};
// Fechas
export var jsonGetOCClientesFechas = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        "MIN(a.Fecha_Emision) AS 'Fecha Inicial'":null,
        "MAX(a.Fecha_Emision) AS 'Fecha Final'": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Estado",
            "operacion": "IN",
            "comparador": "(0,1,3)",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [
        {
            "tabla": "a",
            "columna": "Estado",
        }
    ],
};

// #endregion

// #region JSON: OC_proveedor

// PARA LOS QUE NO TIENEN ABONO
export var jsonGetOCProveedorAbono = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "COUNT(a.TRAZA)  AS 'CANTIDAD'":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"comprobantes_de_pago",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "comprobantes_de_pago",
            "columna": "TRAZA",
            "operacion": null,
            "comparador": "IS NULL",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};
// FECHA DE LOS QUE NO TIENEN ABONO
export var jsonGetOCProveedorAbonoFechas = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "MIN(a.Fecha_actualizacion) AS 'Fecha Inicial'":null,
        "MAX(a.Fecha_actualizacion) AS 'Fecha Final'":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"comprobantes_de_pago",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "comprobantes_de_pago",
            "columna": "TRAZA",
            "operacion": null,
            "comparador": "IS NULL",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

// CANTIDAD DE OCPROVEEDOR QUE NO TIENEN FACTURA
export var jsonGetOCProveedorSinFactura = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "COUNT(a.TRAZA) AS 'CANTIDAD'":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"comprobantes_de_pago",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "comprobantes_de_pago",
            "columna": "Documento_PDF",
            "operacion": "=",
            "comparador": "''",
            "siguienteOperacion": "OR"
        },
        {
            "tabla": "comprobantes_de_pago",
            "columna": "Documento_PDF",
            "operacion": null,
            "comparador": "IS NULL",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};
// FECHA DE LOS QUE NO TIENEN FACTURA
export var jsonGetOCProveedorSinFacturaFechas = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "MIN(a.Fecha_actualizacion) AS 'Fecha Inicial'":null,
        "MAX(a.Fecha_actualizacion) AS 'Fecha Final'":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"comprobantes_de_pago",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "comprobantes_de_pago",
            "columna": "Documento_PDF",
            "operacion": "=",
            "comparador": "''",
            "siguienteOperacion": "OR"
        },
        {
            "tabla": "comprobantes_de_pago",
            "columna": "Documento_PDF",
            "operacion": null,
            "comparador": "IS NULL",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

// EN LOGISTICA
export var jsonGetOCProveedorEnLogistica = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "COUNT(a.TRAZA) AS 'CANTIDAD'":null,
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
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

// FECHAS DE EN LOGISTICA
export var jsonGetOCProveedorEnLogisticaFecha = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        "COUNT(a.TRAZA) AS 'CANTIDAD'":null,
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
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

// #endregion

// #region JSON: COTIZACION

// Cantidad
export var jsonGetCotizaciones = {
    "nombreTabla": "datos_generales_de_cotizaciones a",	
    "informacionColumnas": {
        "COUNT(CASE WHEN DATEDIFF(NOW(), a.Fecha) < 2 THEN 1 END) AS Menos_de_2_dias": null,
        "COUNT(CASE WHEN DATEDIFF(NOW(), a.Fecha) BETWEEN 2 AND 5 THEN 1 END) AS Entre_2_y_5_dias": null,
        "COUNT(CASE WHEN DATEDIFF(NOW(), a.Fecha) BETWEEN 6 AND 7 THEN 1 END) AS Entre_5_y_7_dias": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Fecha",
            "operacion": ">=",
            "comparador": "DATE_SUB(CURDATE(), INTERVAL 7 DAY)",
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};


// #endregion

