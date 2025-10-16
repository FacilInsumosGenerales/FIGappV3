from .excepciones import BaseAppException
from .catalogo_errores import ERROR_CATALOG

def raise_error(code, extra_message=None):
    """
    Lanza una excepción personalizada según el código del catálogo de errores.
    """
    error = ERROR_CATALOG.get(code, {"message": "Error desconocido", "status": 500})
    message = error["message"]

    # Permite añadir un detalle adicional si lo deseas
    if extra_message:
        message = f"{message}. Detalle: {extra_message}"

    # Lanza la excepción personalizada
    raise BaseAppException(code, message, error["status"])

