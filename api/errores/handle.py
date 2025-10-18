from .excepciones import BaseAppException
from .catalogo_errores import ERROR_CATALOG

def raise_error(code="E999", extra_message=None, param=None):
    """
    Lanza una excepción personalizada según el código del catálogo de errores.
    """
    error = ERROR_CATALOG.get(code, {"message": "Error desconocido"})
    message = error["message"]

    if param:
        message = message.format(param=param)

    status = error.get("status", 500)

    if extra_message:
        message = f"{message}. Detalle: {extra_message}"

    raise BaseAppException(code, message, status)

