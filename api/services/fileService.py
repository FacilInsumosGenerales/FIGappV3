import os
import random
import string
from datetime import datetime
from django.conf import settings
from openpyxl import load_workbook


def procesarSubidaArchivo(archivo):
    carpetaRelativa, carpetaAbsoluta = crearCarpeta()
    nombreUnico = generarNombreUnico(archivo)

    rutaArchivo = os.path.join(carpetaAbsoluta, nombreUnico)

    guardarArchivo(rutaArchivo, archivo)

    return f"{settings.MEDIA_URL}{carpetaRelativa}/{nombreUnico}"
  
def crearCarpeta():
    fecha = datetime.now().strftime("%Y-%m-%d")

    carpetaRelativa = f"fileStore/{fecha}"
    carpetaAbsoluta = os.path.join(settings.MEDIA_ROOT, carpetaRelativa)

    os.makedirs(carpetaAbsoluta, exist_ok=True)

    return carpetaRelativa, carpetaAbsoluta

def generarNombreUnico(archivo):
    extension = os.path.splitext(archivo.name)[1]
    caracteres = string.ascii_letters + string.digits
    nombre = ''.join(random.choices(caracteres, k=10))    
    return nombre + extension

def guardarArchivo(rutaArchivo,archivo):
    with open(rutaArchivo, "wb+") as destino:
        for chunk in archivo.chunks():
            destino.write(chunk)
  
def obtenerFilasDeExcel(archivo, ignorarColumnas, extraColunmnas):
    wb = load_workbook(archivo)
    ws = wb.active

    headers = [c.value for c in ws[1]]

    filas = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        filaDict = {}

        for i, valor in enumerate(row):
            col = headers[i]

            if ignorarColumnas and col in ignorarColumnas:
                continue

            filaDict[col] = valor

        if extraColunmnas:
            filaDict.update(extraColunmnas)

        filas.append(filaDict)

    return filas