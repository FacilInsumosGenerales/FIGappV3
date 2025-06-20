
// Cotizaciones enviadas a clientes
export const estadosCotizaciones = {
    0: 'Generada', 
    1: 'Enviada', 
    2: 'Aceptada', 
    3: 'Completadas', 
    4: 'Cancelada'
};

// Estados de movimientos_logisticos
export const estadosMovLog = {
    "0": 'Planeado', 
    "1": 'Entregado', // Esperando guias
    "2": 'Completo', // Con todos los documentos
};

// OC_de_clientes
export const estadosOCClientes = {
    0: 'Registrado', 
    1: 'Comprando',
    2: 'En logistica', 
    3: 'Stand By', 
    4: 'Post Venta', 
    5: 'Completado',
    6: 'Cancelado'
};

// OC de proveedores
export const estadosOCProveedores = {
    0: 'Creada', 
    1: 'Completado',
    2: 'Stand By', 
    3: 'En devolución',
    4: 'Cancelada',
};

// De requerimientos
export const estadosReq = {
    1: '1. Registrado',
    2: '2. Con Planilla',
    3: '3. Con Oferta de Proveedor completas',
    4: '4. Con Cotización al Cliente',
    5: '5. Con OC de cliente',
    6: '6. Con OC a Proveedores',
    7: '7. En Proceso Logístico',
    8: '8. Entregado',
    9: '9. Facturas x Cobrar',
    10: '10. Compró',
    11: '11. Caducado',
    12: '12. Eliminado'
};

export const prioridadesReq = {
    "Baja": "Baja",
    "Media":"Media",
    "Alta": "Alta"
}

// Moneda
export const Monedas = {
    "PEN": "PEN",
    "USD": "USD",
    "EUR": "EUR"
};

export const tipoComprobantePago = {
    0: "Factura",
    1: "Boleta",
    2: "Ninguno"
};

export const categoriaComprobantePago = {
    0: "Cliente",
    1: "Proveedor",
    2: "Logistica",
    3: "Costos equipo",
    4: "Varios"
};

export const tipoNotas = {
    0: "Credito",
    1: "Debito"
};

export const IGV = 0.18;



export const unidad_medidas = {
    "UNIDADES": "UNIDADES",
    "BOLSAS": "BOLSAS",
    "CAJAS": "CAJAS",
    "CIENTOS": "CIENTOS",
    "GALONES": "GALONES",
    "KILOGRAMOS": "KILOGRAMOS",
    "LITROS": "LITROS",
    "METROS": "METROS",
    "PARES": "PARES",
    "ROLLOS": "ROLLOS",
    "PAQUETES": "PAQUETES",
    "GRAMOS": "GRAMOS"
};

// Valores para categoria para el uso en el tabulator
export const categorias = {
    "QUÍMICOS": "QUÍMICOS",
    "MISCELANEOS": "MISCELANEOS",
    "OFICINA - MUEBLES": "OFICINA - MUEBLES",
    "MANTENIMIENTO": "MANTENIMIENTO",
    "HERRAMIENTAS": "HERRAMIENTAS",
    "PLASTICOS": "PLASTICOS",
    "LIMPIEZA": "LIMPIEZA",
    "ELECTRICOS": "ELECTRICOS",
    "SEGURIDAD INDUSTRIAL": "SEGURIDAD INDUSTRIAL",
    "CÁMARA": "CÁMARA",
    "SILLAS": "SILLAS",
    "INSTRUMENTO DE MEDICION": "INSTRUMENTO DE MEDICION",
    "BOMBA": "BOMBA",
    "EMPAQUE Y EMBALAJES": "EMPAQUE Y EMBALAJES",
    "ANTIDERRAME": "ANTIDERRAME",
    "BOTIQUIN": "BOTIQUIN",
    "MERCHANDISING": "MERCHANDISING",
    "CAJA DE CARTÓN": "CAJA DE CARTÓN",
    "SOLDADURA": "SOLDADURA",
    "CAFETERIA": "CAFETERIA",
    "DELIVERY": "DELIVERY",
    "CAMPAAMENTO": "CAMPAAMENTO",
    "MOCHILAS": "MOCHILAS",
    "GARRUCHAS": "GARRUCHAS",
    "LABORATORIO": "LABORATORIO",
    "AIRE ACONDICIONADO": "AIRE ACONDICIONADO",
    "UTILES DE OFICINA": "UTILES DE OFICINA",
    "ESCALERAS": "ESCALERAS",
    "PALLETS": "PALLETS",
    "METALMECÁNICO": "METALMECÁNICO"
};

export const tipoDeCambio = {
    'USD': 3.68,
    'EUR': 4.03,
    'PEN':1
}