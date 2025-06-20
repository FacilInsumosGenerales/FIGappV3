// JSON
export const jsonNuevasOCcCliente = {
    "nombreTabla": "datos_generales_ocs_clientes poc",	
    "informacionColumnas": {
        //datos propios
        "poc.TRAZA":"",
        //datos_generales_del_proceso x
        "datos_generales_del_proceso.Cod_Req AS codigo":"",
        //Orden de compra de cliente x
        "poc.Numero_OC_Cliente":"",
        "poc.Ediciones": null,
        "MIN(productos_en_OC_cliente.Fecha_entrega_maxima) AS 'fecha'": null,
        "poc.Estado": null,
        "GROUP_CONCAT(DISTINCT CONCAT(productos_en_OC_cliente.Fecha_entrega_maxima,',',empresas.Nombre,',',datos_generales_orden_compra_a_proveedores.No_Orden_de_Compra) SEPARATOR ';') as 'listaOCProveedor'": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
            "nombreTablaDerecha":"poc",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Numero_de_Cotizacion"
        },
        {
            "nombreTablaIzquierda":"datos_generales_del_proceso",
            "nombreTablaDerecha":"datos_generales_de_cotizaciones",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Cod_Req"
        },
        {
            "nombreTablaIzquierda":"productos_en_OC_cliente",
            "nombreTablaDerecha":"poc",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"OC_cliente",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"productos_en_oc_proveedor",
            "nombreTablaDerecha":"productos_en_OC_cliente",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"Producto_OC_cliente",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"datos_generales_orden_compra_a_proveedores",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_proveedor"
        },
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaDerecha":"datos_generales_orden_compra_a_proveedores",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Proveedor"
        },
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"contactos",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Empresa"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "poc",
            "columna": "Estado",
            "operacion": "IN",
            "comparador": "(0,1,2)" ,
            "siguienteOperacion": null
        },
    ],
    "orderby": [
        {
            "tabla" : "poc",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [
        {
            "tabla" : "poc",
            "columna" : "TRAZA"
        }
    ],
};

export const jsonMovimientosLogistico = {
    "nombreTabla": "movimientos_logisticos m",	
    "informacionColumnas": {
        //datos propios
        "m.Fecha_planeada":null, 
        "m.TRAZA":null, 
        "lugarInicio.Nombre_de_lugar AS lugarInicio":null,
        "lugarFinal.Nombre_de_lugar AS lugarFinal":null,
        //empresas
        "empresas.Nombre AS empresaProveedor":null,
        "m.Ediciones":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"m",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Transportista"
        },
        {
            "nombreTablaIzquierda":"lugares",
            "nombreTablaIzquierdaAlias": "lugarInicio",
            "nombreTablaDerecha":"m",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_inicial"
        },
        {
            "nombreTablaIzquierda":"lugares",
            "nombreTablaIzquierdaAlias": "lugarFinal",
            "nombreTablaDerecha":"m",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_final"
        },

    ],
    "datosFiltro": [],
    "orderby": [
        {
            "tabla" : "m",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [],
};



