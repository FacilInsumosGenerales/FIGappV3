
ERROR_CATALOG = {
    "E001": {
        "type": "ValidationError",
        "message": "El parámetro '{param}' está vacío o ausente.",
        "status": 400
    },
    "E002": {
        "type": "ValidationError",
        "message": "El parámetro '{param}' no es un JSON válido."
    },
    "E003": {
        "type": "ValidationError",
        "message": "El parámetro '{param}' debe ser un objeto JSON."
    },
    "E100": {
        "type": "DatabaseError",
        "message": "Error al ejecutar el procedimiento almacenado: {detail}"
    },
    "E400": {
        "type": "IntegrityError",
        "message": "Error de integridad '{param}'"
    },
    "E404": {
        "type": "DoesNotExist",
        "message": "No se encontró ningún objeto que cumpla el filtro: '{param}'"
    },
    "E500": {
        "type": "Exception",
        "message": "Error en codigo: {detail}",
        "status": 500
    },
    "E999": {
        "type": "BaseAppException",
        "message": "Error desconocido: {detail}",
        "status": 500
    }
}