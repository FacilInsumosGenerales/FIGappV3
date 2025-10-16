class BaseAppException(Exception):
    """Excepción base para errores de la aplicación."""
    def __init__(self, code, message, status=400):
        self.codigo = code
        self.mensaje = message
        self.estado = status
        super().__init__(self.mensaje)

    def aDiccionario(self):
        return {
            "error_code": self.codigo,
            "error_message": self.mensaje,
            "status": self.estado
        }


class ValidacionError(BaseAppException):
    """Errores de validación de datos."""
    pass


class DataBaseError(BaseAppException):
    """Errores al ejecutar procedimientos o consultas."""
    pass


class UnauthorizedError(BaseAppException):
    """Errores de autenticación/autorización."""
    pass
