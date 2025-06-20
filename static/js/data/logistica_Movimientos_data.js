import { fechaEditorParams, fileEditor, formateadorDeFechas, mostrarArchivoEnTabulator, prepTabulator } from "../utils/tabulator_utils.js";
import { estadosMovLog, Monedas, tipoComprobantePago } from "./estados_data.js";

export const tblMovimientosLogisticosOpcions = prepTabulator([
    { title: "TRAZA", field: "TRAZA"},
    { title: "Fecha_planeada", field: "Fecha_planeada", 
        formatter: formateadorDeFechas
    },  
    { title: "Fecha_real", field: "Fecha_real",
        formatter: formateadorDeFechas
     },
    { title: "Estado", field: "Estado", 
        formatter: (cell) => {
            const value = cell.getValue();
            return estadosMovLog[value];
        }
    },
    { title: "Transportista", field: "Transportista" },
    { title: "Transportista_Traza", field: "Transportista_Traza", visible: false },
    { title: "Lugar_Inicial", field: "Lugar_Inicial" },
    { title: "Requisitos_Ingreso_Local_Inicial", field: "Requisitos_Ingreso_Local_Inicial", visible: false },
    { title: "Direccion_Inicial", field: "Direccion_Inicial", visible: false },
    { title: "Horario_de_atencion_Inicial", field: "Horario_de_atencion_Inicial", visible: false },

    { title: "Lugar_Final", field: "Lugar_Final"  },
    { title: "Requisitos_Ingreso_Local_Final", field: "Requisitos_Ingreso_Local_Final", visible: false },
    { title: "Direccion_Final", field: "Direccion_Final", visible: false },
    { title: "Horario_de_atencion_Final", field: "Horario_de_atencion_Final", visible: false },

    { title: "Requerimientos", field: "Requerimientos" },
    { title: "Folder_imagenes", field: "Folder_imagenes", visible: false},
],false,1);

export const tblGuiasOpcions = prepTabulator([
    { title: "Traza", field: "TRAZA" },
    { title: "Numero de Guia", field: "numero" },  
    { title: "Numero_OC_Cliente", field: "Numero_OC_Cliente" },
    { title: "TRAZA OC_cliente", field: "ocClienteTRAZA" },
    { title: "Guia sin Firmar PDF", field: "sin_firmar", formatter: function(cell){
        return mostrarArchivoEnTabulator(cell);
    }},
    { title: "Guia_firmada_PDF", field: "firmada", formatter: function(cell){
        return mostrarArchivoEnTabulator(cell);
    }}
]);

export const tblGuiasEditarOpcions = prepTabulator([
    { title: "Traza", field: "TRAZA" },
    { title: "Numero de Guia", field: "numero", editor:"input" },  
    { title: "TRAZA OC_cliente", field: "ocClienteTRAZA", editor:"list" },  
    { title: "Guia sin Firmar PDF", field: 'sin_firmar', editor: fileEditor, editorParams: { typeInput: "file" } },
    { title: "Guia sin Firmar PDF archivo", field: 'sin_firmar archivo', visible: false},
    { title: "Guia_firmada_PDF", field: 'firmada', editor: fileEditor, editorParams: { typeInput: "file" } },
    { title: "firmada archivo", field: 'firmada archivo', visible: false},
]);

export const tblProductoOpcions = prepTabulator([
    { title: "TRAZA", field: "TRAZA" , visible: false},
    { title: "Producto Traza", field: "ptraza" },
    { title: "Numero_OC_Cliente", field: "Numero_OC_Cliente", visible: false },
    { title: "Cod_Req", field: "Cod_Req", visible: false },
    { 
        title: "Cod_Req / Numero_OC_Cliente", 
        field: "Serie", // Campo virtual
        formatter: function (cell) {
            const data = cell.getData();
            const codReq = data['Cod_Req'] || ''; 
            const numOC = data['Numero_OC_Cliente'] || ''; 
            return `${codReq} / ${numOC}`; // Concatenación con separador
        }
    },
    { title: "Producto", field: "producto" },  
    { title: "Movimiento Traza", field: "mtraza", visible: false },
    { title: "Movimiento", field: "movimiento", visible: false }
]);

export const tblProductoEditarOpcions = prepTabulator([
    { title: "TRAZA", field: "TRAZA" },
    { title: "Cod_Req", field: "Cod_Req" },
    { title: "Producto", field: "ptraza", editor: "list" }
],false,90);

export const tblFacturasOptions = prepTabulator([
    { title: "TRAZA", field: 'TRAZA' },
    { title: "Categoria", field: 'Categoria' },
    { title: "Descripcion", field: 'Descripcion' },
    { title: "Numero_de_documento", field: 'Numero_de_documento' },
    { title: "Fecha_Emision", field: 'Fecha_Emision' },
    { title: "Fecha_Vencimiento", field: 'Fecha_Vencimiento' },
    { title: "Fecha_de_Envio", field: 'Fecha_de_Envio' },
    { title: "Valor_sin_IGV", field: 'Valor_sin_IGV' },
    { title: "IGV", field: 'IGV' },
    { title: "Moneda", field: 'Moneda' },
    { title: "Saldo", field: 'Saldo' },
    { title: "Documento_PDF", field: 'Documento_PDF' },
    { title: "Ediciones", field: 'Ediciones', visible: false }
],false);

export const tblFacturasEditarOpcions = prepTabulator([
    { title: "TRAZA",  field: 'TRAZA', editor: "list" }, 
    { title: "Tipo",  field: 'Tipo', editor: "list", editorParams: {
        values: tipoComprobantePago
    }},
    { title: "Descripci&oacute;n" , field: 'Descripcion', editor: "input" },
    { title: "N&uacute;mero de factura" , field: 'Numero_de_documento', editor: "input" },
    { title: "Fecha de emisi&oacute;n" , field: 'Fecha_Emision', editor: "datetime", editorParams: fechaEditorParams},
    { title: "Fecha de Vencimiento" , field: 'Fecha_Vencimiento', editor: "datetime", editorParams: fechaEditorParams},
    { title: "Fecha de Env&iacute;o" , field: 'Fecha_de_Envio', editor: "datetime", editorParams: fechaEditorParams},
    { title: "Monto sin IGV" , field: 'Valor_sin_IGV', editor: "number" }, 
    { title: "IGV" , field: 'IGV', editor: "number" }, 
    { title: "Moneda" , field: 'Moneda', editor: "list", editorParams: {
        values: Monedas
    }},
    { title: "Documento_PDF" , field: 'Documento_PDF', editor: fileEditor, editorParams: { typeInput: "all" }},
    { title: "Documento_PDF_archivo", field: 'Documento_PDF_archivo', visible: false  },
],false,1);

export const jsonGetMovimientosLogisticos = {
    "nombreTabla": "movimientos_logisticos a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA AS TRAZA": null,
        "a.Fecha_planeada": null,
        "a.`Fecha_real`": null,
        "a.Estado": null,
        "l1.TRAZA AS 'Lugar_Inicial TRAZA'": null,
        "l1.Nombre_de_lugar AS 'Lugar_Inicial'": null,
        "l1.`Requisitos_Ingreso_Local` AS 'Requisitos_Ingreso_Local_Inicial'": null,
        "l1.Direccion AS 'Direccion_Inicial'": null,
        "l1.`Horario_de_atencion` AS 'Horario_de_atencion_Inicial'": null,
        "l2.Nombre_de_lugar AS 'Lugar_Final'": null,
        "l2.`Requisitos_Ingreso_Local` AS 'Requisitos_Ingreso_Local_Final'": null,
        "l2.`Horario_de_atencion` AS 'Horario_de_atencion_Final'": null,
        "l1.Direccion AS 'Direccion_Final'": null,
        "a.`Folder_imagenes`": null,
        "empresas.Nombre AS 'Transportista'": null,
        "a.Transportista AS 'Transportista_Traza'": null,
        "GROUP_CONCAT( DISTINCT datos_generales_del_proceso.Cod_Req SEPARATOR ', ') AS Requerimientos": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"lugares",
            "nombreTablaIzquierdaAlias":"l1",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_inicial"
        },
        {
            "nombreTablaIzquierda":"lugares",
            "nombreTablaIzquierdaAlias":"l2",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_final"
        },
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Transportista"
        },
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaIzquierdaAlias":"pm",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"Movimiento",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaIzquierdaAlias":"pl",
            "nombreTablaDerecha":"pm",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto"
        },
        {
            "nombreTablaIzquierda":"productos_en_oc_proveedor",
            "nombreTablaIzquierdaAlias":"pp",
            "nombreTablaDerecha":"pl",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto"
        },
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaIzquierdaAlias":"bc",
            "nombreTablaDerecha":"pp",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
        {
            "nombreTablaIzquierda":"planilla",
            "nombreTablaIzquierdaAlias":"p",
            "nombreTablaDerecha":"bc",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_Solicitado"
        },
        {
            "nombreTablaIzquierda":"datos_generales_del_proceso",
            "nombreTablaDerecha":"p",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Cod_Req"
        },

    ],
    "datosFiltro": [
        
        {
            "tabla": "a",
            "columna": "Fecha_planeada",
            "operacion": "BETWEEN",
            "comparador": null,
            "siguienteOperacion": null
        },  
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [
        {
            "tabla": "a",
            "columna": "TRAZA",
        }
    ]
};

export const jsonPutMovimientosLogisticos = {
    "nombreTabla": "movimientos_logisticos",	
    "informacionColumnas": {
        "Folder_imagenes": null,
        "Estado": null,
        "Transportista": null,
        "Lugar_Inicial": null,
        "Lugar_Final": null,
        "Fecha_real": null,
        "Fecha_planeada": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "movimientos_logisticos",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export const jsonPutMovimientosLogisticosComprobante = {
    "nombreTabla": "movimientos_logisticos",	
    "informacionColumnas": {
        "Movimiento_bancario": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "movimientos_logisticos",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export const jsonPutImagenes = {
    "nombreTabla": "movimientos_logisticos",	
    "informacionColumnas": {
        "Adjunto": null,
        "actualizar_adjunto":"data"
    },
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

export const jsonGetGuias = {
    "nombreTabla": "guias_emitidas a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA": null,
        "a.Numero_Guia": null,
        "a.Guia_sin_firma_PDF AS sin_firmar": null,
        "a.Guia_firmada_PDF AS firmada": null,
        //OC_cliente
        "datos_generales_ocs_clientes.Numero_OC_Cliente": null,
        "datos_generales_ocs_clientes.TRAZA AS ocClienteTRAZA": null
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
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaDerecha":"datos_generales_ocs_clientes",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_cliente",
            "campoDerecha":"TRAZA"
        },  
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaDerecha":"productos_en_logistica",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "Movimiento",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }              
    ],
    "orderby": [],
    "groupby": [
        {
            "tabla": "a",
            "columna": "TRAZA",
        }
    ]
};

export const jsonPostGuias = {
    "nombreTabla": "guias_emitidas",	
    "informacionColumnas": [],
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],  
};

export const jsonPutGuias = {
    "nombreTabla": "guias_emitidas",	
    "informacionColumnas": 
    {
        "OC_de_cliente": null,
        "Numero_Guia": null,
        "Guia_sin_firma_PDF": null,
        "Guia_firmada_PDF": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "guias_emitidas",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador":  null,//traza,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export const jsonGetOCCliente = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA":null,
        "a.Numero_OC_Cliente":null,
        "a.OC_Cliente_PDF": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_cliente",
            "campoDerecha":"TRAZA"
        },  
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaDerecha":"productos_en_logistica",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "Movimiento",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }               
    ],
    "groupby": [
        {
            "tabla": "a",
            "columna": "TRAZA",
        }
    ]
};

export const jsonGetListaOCCliente = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA AS id":null,
        "a.Numero_OC_Cliente AS label":null,
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_cliente",
            "campoDerecha":"TRAZA"
        },  
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaDerecha":"productos_en_logistica",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "Movimiento",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }               
    ],
    "orderby": [],
    "groupby": [
        {
            "tabla": "a",
            "columna": "TRAZA",
        }
    ]
};

export const jsonGetOCProveedor = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA":"",
        "a.No_Orden_de_Compra AS numero":"",
        "a.OC_pdf": null
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
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaDerecha":"productos_en_logistica",
            "tipoRelacion":"INNER",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "Movimiento",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }              
    ],
    "groupby": [
        {
            "tabla": "a",
            "columna": "TRAZA",
        }
    ]
};

export const jsonGetProducto = {
    "nombreTabla": "productos_en_movimiento a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA":"",
        "a.Movimiento AS mtraza": null,
        "a.Producto AS ptraza" : null,
        "bc.Descripcion_proveedor AS producto": null,
        "datos_generales_del_proceso.Cod_Req": null,
        "dc.Numero_OC_Cliente": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"productos_en_logistica",
            "nombreTablaIzquierdaAlias":"pl",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto"
        },
        {
            "nombreTablaIzquierda":"productos_en_oc_proveedor",
            "nombreTablaIzquierdaAlias":"pp",
            "nombreTablaDerecha":"pl",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto"
        },
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaIzquierdaAlias":"bc",
            "nombreTablaDerecha":"pp",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
        {
            "nombreTablaIzquierda":"planilla",
            "nombreTablaIzquierdaAlias":"p",
            "nombreTablaDerecha":"bc",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_Solicitado"
        },
        {
            "nombreTablaIzquierda":"datos_generales_del_proceso",
            "nombreTablaDerecha":"p",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Cod_Req"
        },
        {
            "nombreTablaIzquierda":"productos_en_OC_cliente",
            "nombreTablaIzquierdaAlias":"pc",
            "nombreTablaDerecha":"pp",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_OC_cliente"
        },
        {
            "nombreTablaIzquierda":"datos_generales_ocs_clientes",
            "nombreTablaIzquierdaAlias":"dc",
            "nombreTablaDerecha":"pc",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"OC_cliente"
        },

    ],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "Movimiento",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": []
};

export const jsonGetTransportista = {
    "nombreTabla": "empresas a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA AS id":"",
        "a.Nombre AS text":""
    },
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "Nombre",
            "orden" : "ASC"
        }
    ]
};

export const jsonGetProductosLogisticos = {
    "nombreTabla": "productos_en_logistica a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA AS id":"",
        "bd_cotizaciones_de_proveedores.Descripcion_proveedor AS label":""
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"productos_en_oc_proveedor",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto"
        },
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
        {
            "nombreTablaIzquierda":"productos_en_movimiento",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"Producto",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "TRAZA",
            "operacion": null,
            "comparador": "IS NULL",
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

export const jsonPutProductosEnMovimiento = {
    "nombreTabla": "productos_en_movimiento",	
    "informacionColumnas": 
    {
        "Producto": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "productos_en_movimiento",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador":  null,//traza,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export const jsonPostProductosEnMovimiento = {
    "nombreTabla": "productos_en_movimiento",	
    "informacionColumnas": [
        {
            "Producto": null,
            "Movimiento": null
        }
    ],
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

export const jsonGetProductosSP = {
    "nombreTabla": "productos_en_movimiento a",	
    "informacionColumnas": {
        //datos propios
        "a.*": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": null,
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

export const jsonGetFacturas = {
    "nombreTabla": "comprobantes_de_pago a",	
    "informacionColumnas": 
        {
            "a.*": null
        },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"movimientos_logisticos",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"`Movimiento_bancario`",
            "campoDerecha":"TRAZA"
        },
    ],
    "datosFiltro": [            
        {
            "tabla": "movimientos_logisticos",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export const jsonGetFacturaPorTraza = {
    "nombreTabla": "comprobantes_de_pago a",	
    "informacionColumnas": 
        {
            "a.*": null
        },
    "tablaJoins": [],
    "datosFiltro": [            
        {
            "tabla": "a",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export var jsonPostFacturas = {
    "nombreTabla": "comprobantes_de_pago", // Nombre de la tabla en la base de datos
    "informacionColumnas": [], // Información de las columnas de la tabla
    "tablaJoins": [], // Joins si se requiere unir tablas (actualmente vacío)
    "datosFiltro": [], // Filtros aplicables (actualmente vacío)
    "orderby": [], // Orden de los resultados (actualmente vacío),
    "groupby": [],
};  

export const jsonPutFacturas = {
    "nombreTabla": "comprobantes_de_pago",	
    "informacionColumnas": {      
        // Contacto_cliente
        "Descripcion": null,
        "Numero_de_documento": null,
        "Fecha_Emision": null,
        "Fecha_Vencimiento": null,
        "Fecha_de_Envio": null,
        "Valor_sin_IGV": null,
        "IGV": null,
        "Moneda": null,
        "Documento_PDF": null
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "comprobantes_de_pago",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null, // TRAZA
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export var jsonListaFacturas = {
    "nombreTabla": "comprobantes_de_pago a",	
    "informacionColumnas": {
        "a.TRAZA":null,
        "a.Numero_de_documento AS 'Nombre'":null,
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
            "tabla": "a",
            "columna": "Proveedor",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [],
};

export var jsonGetMovimientosFacturasRelacionadas = {
    "nombreTabla": "movimientos_logisticos a",	
    "informacionColumnas": {
        "a.TRAZA":null,
        "a.Fecha_planeada":null,
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
            "tabla": "a",
            "columna": "`Movimiento_bancario`",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [],
};

export var jsonGetFacturasRelacionadas = {
    "nombreTabla": "guias_emitidas a",	
    "informacionColumnas": {
        "a.TRAZA":null,
        "a.Numero_Guia":null,
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
            "tabla": "a",
            "columna": "Numero_Guia",
            "operacion": "IN",
            "comparador": null,
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [],
};

export var jsonGetFacturasRelacionadasPorTraza = {
    "nombreTabla": "guias_emitidas a",	
    "informacionColumnas": {
        "a.TRAZA":null,
        "a.Numero_Guia":null,
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
            "tabla": "a",
            "columna": "Numero_Guia",
            "operacion": "=",
            "comparador": null,
            "siguienteOperacion": "AND"
        },
        {
            "tabla": "a",
            "columna": "TRAZA",
            "operacion": "!=",
            "comparador": null,
            "siguienteOperacion": null
        },
    ],
    "orderby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA",
            "orden" : "DESC"
        }
    ],
    "groupby": [],
};

export const dataModalMovimientoLogistico = {
    "nombreTabla": "movimientos_logisticos",
    "columnas": 
        [
            { 
                id: "TRAZA", 
                nombreColumnaTabulator: "TRAZA",
                tipoInput: "parrafo", 
                placeholder: "TRAZA", 
                nombreColumnaBD: "TRAZA" 
            },
            { 
                id: "movimientoTransportista", 
                nombreColumnaTabulator: "Transportista_Traza",
                tipoInput: "select2", 
                placeholder: "Transportista", 
                opciones: jsonGetTransportista, 
                nombreColumnaBD: "Transportista" 
            }    
        ]
};  