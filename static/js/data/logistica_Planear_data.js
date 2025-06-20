import { formateadorDeFechas, prepTabulator } from "../utils/tabulator_utils.js";

// Definición de tablas
export let tblProductosOCOptions = prepTabulator([
    { title: "TRAZA log", field: "TRAZA"},  
    { title: "Descripci&oacute;n proveedor", field: "Descripcion_proveedor", formatter: "textarea", visible: false },
    { title: "Descripci&oacute;n cliente", field: "Descripcion_proveedor", formatter: "textarea", frozen: true },
    {title: "Ediciones", field: "Ediciones", visible:false},    
    { title: "Fecha_ultima_planeada", field: "Fecha_ultima_planeada" ,formatter: formateadorDeFechas},
    { title: "Fecha_entrega_proveedor", field: "Fecha_entrega_proveedor" ,formatter: formateadorDeFechas},
    { title: "Fecha_entrega_cliente", field: "Fecha_entrega_cliente",formatter: formateadorDeFechas },
    {title: "Cantidad", field: "Cantidad"},
    { title: "Cod_Req", field: "Cod_Req"},     
    {title: "OC_proveedor", field: "No_Orden_de_Compra"},
    { title: "Proveedor", field: "Proveedor", formatter: "textarea" },
    { title: "Contacto_proveedor", field: "Contacto" },
    { title: "N&uacute;mero", field: "Numero" },
    { title: "Correo", field: "Correo" },
    { title: "Destino_final", field: "Direccion_Final" },
    { title: "Ubicacion Ultimo_plan", field: "Ultimo_plan", visible: false },
    { title: "Ubicacion Ultimo_plan", field: "Ultimo_plan_TRAZA", visible: false },
    
],false,50,"Ultimo_plan");

//Definición de JSONs
export const jsonGetTransportistas = {
    "nombreTabla": "empresas",	
    "informacionColumnas": {
        "Nombre AS nombre": null,
        "TRAZA AS id": null,
    },
    "tablaJoins": [],
    "datosFiltro": [
        {
            "tabla": "empresas",
            "columna": "Logistica",
            "operacion": "=",
            "comparador": 1, //traza
            "siguienteOperacion": null
        }
    ],
    "orderby": [
        {
            "tabla" : "empresas",
            "columna" : "Nombre",
            "orden" : "ASC"
        }
    ],
    "groupby": [],
};

export const jsonGetLugares = {
    "nombreTabla": "lugares",	
    "informacionColumnas": {
        "CONCAT(COALESCE(Nombre_de_lugar,''),': ',COALESCE(Direccion,'')) AS nombre": null,
        "TRAZA AS id": null,
    },
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [
        {
            "tabla" : "lugares",
            "columna" : "Nombre_de_lugar",
            "orden" : "ASC"
        }
    ],
    "groupby": [],
};

export const jsonPostProductosMovimientos = {
    "nombreTabla": "productos_en_movimiento",	
    "informacionColumnas": [],
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};

export const jsonPostMovimientoLogistico = {
    "nombreTabla": "movimientos_logisticos",	
    "informacionColumnas": 
        [
            {
                "Lugar_inicial": null,
                "Lugar_final": null,
                "`Peso_kg`": null,
                "`Volumen_m3`": null,
                "Paletizado": null,
                "Fecha_planeada": null,
                "`Fecha_real`": null,
                "Transportista": null,
                "Estado": null,
                "`Movimiento_bancario`": null,
                "Ediciones": null
            }
        ]
    ,
    "tablaJoins": [],
    "datosFiltro": [],
    "orderby": [],
    "groupby": [],
};
