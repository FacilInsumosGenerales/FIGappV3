from ..errores.handle import raise_error
import json

def esVacio(*args):
    for nombre, valor in args:
        if valor is None or (isinstance(valor, str) and valor.strip() == ""):
            return True, nombre
    return False, None


def validarCamposRequeridos(**kwargs):
    hayVacio, campoFaltante = esVacio(*kwargs.items())
    if hayVacio:
        raise_error("E001", f"Falta {campoFaltante}")


def validarContenidoData(jsonInterpretado,valoresObligatorios):
    for valorObligatorio in valoresObligatorios:
        if valorObligatorio not in jsonInterpretado or jsonInterpretado[valorObligatorio] in [None, ""]:
            raise_error("E002", f"El campo {valorObligatorio} está vacío o no fue proporcionado")


        


