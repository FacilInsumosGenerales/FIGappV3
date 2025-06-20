import { fechaEditorParams, fileEditor, prepTabulator } from "../utils/tabulator_utils.js";
import { estadosOCProveedores } from "./estados_data.js";

export const tblOCProveedorOptions = prepTabulator([
    { title: "TRAZA", field: "TRAZA"},
    { title: "No_Orden_de_Compra", field: "No_Orden_de_Compra" },
    { title: "Estado", field: "Estado", mutator: function(value, data){
        let estado = estadosOCProveedores[data.Estado];
        return estado;
    }},
    { title: "Empresa_proveedor", field: "Empresa_proveedor" },  
    { title: "Contacto_proveedor", field: "Contacto_proveedor" },
    { title: "Celular", field: "Celular" },
    { title: "Email", field: "Email" },
    { title: "Nombre_de_lugar", field: "Nombre_de_lugar", visible: false },
    { title: "Lugar_de_recojo", field: "Lugar_de_recojo" },
    { title: "Departamento", field: "Departamento", visible: false },
    { title: "Requisitos_Ingreso_Local", field: "Requisitos_Ingreso_Local", visible: false },
    { title: "Horario_de_atencion", field: "Horario_de_atencion", visible: false },
    { title: "OC_pdf", field: "OC_pdf", visible:false },
    { title: "Ediciones", field: "Ediciones", visible:false },
],true);

export const tblGuiasOptions = prepTabulator([
    { title: "TRAZA", field: "TRAZA"},
    { title: "Numero_Guia", field: "Numero_Guia" },  
    { title: "Guias_sin_firmas_PDF", field: "Guias_sin_firmas_PDF" },
    { title: "Guias_firmada_PDF", field: "Guias_firmada_PDF" },
    { title: "Fecha_Emision", field: "Fecha_Emision" }
],false,1);

export const tblGuiasEditarOptions = prepTabulator([
    { title: "TRAZA", field: "TRAZA"},
    { title: "Numero_Guia", field: "Numero_Guia", editor:"input" },  
    { title: "Guias_sin_firmas_PDF", field: "Guias_sin_firmas_PDF", editor:fileEditor, editorParams: {typeInput: "file"} },
    { title: "Guias_sin_firmas_PDF File", field: "Guias_sin_firmas_PDF archivo", visible:false },
    { title: "Guias_firmada_PDF", field: "Guias_firmada_PDF", editor:fileEditor, editorParams: {typeInput: "file"} },
    { title: "Guias_firmada_PDF File", field: "Guias_firmada_PDF archivo", visible:false },
    { title: "Fecha_Emision", field: "Fecha_Emision", editor:"datetime", editorParams: fechaEditorParams }
],false,1);

export const tblProductosLogisticaOptions = prepTabulator([
    { title: "TRAZA", field: "TRAZA", visible: false },
    { title: "Descripcion_proveedor", field: "Descripcion_proveedor"},
    { title: "No_Orden_de_Compra", field: "No_Orden_de_Compra"},  
    { title: "Cantidad", field: "Cantidad"},
    { title: "Fecha_entrega_proveedor", field: "Fecha_entrega_proveedor"},
    { title: "Proveedor", field: "Proveedor"},
    { title: "Contacto", field: "Contacto"},
    { title: "Nombre lugar (&uacute;ltimo plan)", field: "Lugar_actual"},
    { title: "Direcci&oacute;n (&uacute;ltimo plan)", field: "Direccion_actual"},
    { title: "Ediciones", field: "Ediciones", visible:false}
],true,0);

export var jsonOCCliente = {
    "nombreTabla": "datos_generales_ocs_clientes a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA": null,
        "a.Numero_OC_Cliente":null,
        "a.OC_Cliente_PDF":null,
        "a.Fecha_Emision":null,
        "a.Ediciones": null,
        //datos_generales_de_cotizaciones x 
        "datos_generales_de_cotizaciones.Archivo": null,
        //datos_generales_del_proceso  x
        "CONCAT(datos_generales_del_proceso.Cod_Req,' ', datos_generales_del_proceso.Nombre_del_producto)  AS 'Cod_Req'": null,
        //lugares x 
        "COALESCE(lugares.Direccion,'') AS Direccion":null,
        "COALESCE(lugares.Nombre_de_lugar,'') AS LugarNombre":null,
        "COALESCE(lugares.`Requisitos_Ingreso_Local`,'') AS LugarReq":null,
        "COALESCE(lugares.`Horario_de_atencion`,'') AS LugarHorario":null,
        //contactos
        "CONCAT(COALESCE(contactos.Nombre,''), ' ', COALESCE(empresas.Nombre,'')) AS 'Contacto'":null,
        "datos_generales_del_proceso.TRAZA AS 'Requerimiento_TRAZA'": null
    },
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
            "nombreTablaDerecha":"a",
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
            "nombreTablaIzquierda":"lugares",
            "nombreTablaDerecha":"datos_generales_del_proceso",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_de_entrega_al_cliente"
        },
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
            "tabla": "a",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": null, //traza
            "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
};

export var jsonOCProveedor = {
    "nombreTabla": "datos_generales_orden_compra_a_proveedores a",	
    "informacionColumnas": {
        //datos propios
        "a.TRAZA":null,
        "a.No_Orden_de_Compra":null,
        "a.Estado":null,
        "a.OC_pdf" : null,
        "a.Ediciones": null,
        "DATE_FORMAT(a.Fecha_actualizacion, '%Y-%m-%d') AS 'Fecha_registro'": null,
        //empresas
        "empresas.Nombre AS 'Empresa_proveedor'": null,
        "contactos.Nombre AS 'Contacto_proveedor'": null,
        "contactos.Email": null,
        "contactos.Celular": null,
        //lugares
        "lugares.Nombre_de_lugar": null,
        "lugares.Direccion AS 'Lugar_de_recojo'": null,
        "lugares.Departamento": null,
        "lugares.`Requisitos_Ingreso_Local`": null,
        "lugares.`Horario_de_atencion`": null
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
            "nombreTablaIzquierda":"productos_en_OC_cliente",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_OC_cliente"
        },
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaDerecha":"productos_en_oc_proveedor",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
        {
            "nombreTablaIzquierda":"cotizaciones_proveedores",
            "nombreTablaDerecha":"bd_cotizaciones_de_proveedores",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Cotizacion"
        },
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaDerecha":"cotizaciones_proveedores",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Contacto_proveedor"
        },
        {
            "nombreTablaIzquierda":"empresas",
            "nombreTablaDerecha":"contactos",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Empresa"
        },
        {
            "nombreTablaIzquierda":"lugares",
            "nombreTablaDerecha":"a",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Lugar_de_entrega"
        }
    ],
    "datosFiltro": [
        {
            "tabla": "productos_en_OC_cliente",
            "columna": "OC_cliente",
            "operacion": "=",
            "comparador": null,//traza,
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
    "groupby": [
        {
            "tabla" : "a",
            "columna" : "TRAZA"
        }
    ],
};

export var jsonGetGuias = {
    "nombreTabla": "guias_emitidas a",	
    "informacionColumnas": {
        //datos propios
        "*":null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "a",
            "columna": "OC_de_cliente",
            "operacion": "=",
            "comparador": null,//traza,
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

export var jsonPutGuias = {
    "nombreTabla": "guias_emitidas",	
    "informacionColumnas": {
        "Numero_Guia": null,
        "Guia_sin_firma_PDF": null,
        "Guia_firmada_PDF": null,
        "Fecha_Emision": null,
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
        "tabla": "guias_emitidas",
        "columna": "TRAZA",
        "operacion": "=",
        "comparador": null,// traza requerimiento
        "siguienteOperacion": null
        }
    ],
    "orderby": [],
};

export var jsonPostGuias = {
    "nombreTabla": "guias_emitidas",	
    "informacionColumnas": [],
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": []
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
            "operacion": "",
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

export var jsonPutRequerimientoEstado = {
    "nombreTabla": "datos_generales_del_proceso",	
    "informacionColumnas": {
        "Estado": 8
    },
    "tablaJoins": [],
    "datosFiltro": [            
        {
        "tabla": "datos_generales_del_proceso",
        "columna": "TRAZA",
        "operacion": "=",
        "comparador": null,// traza requerimiento
        "siguienteOperacion": null
        }
    ],
    "orderby": [],
    "groupby": [],
}; 

export var jsonArchivos = {
    "nombreTabla": "guias",	
    "informacionColumnas": {
        "Adjunto": null,
        "actualizar_adjunto":"data"
    },
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};