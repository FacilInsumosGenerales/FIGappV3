from django.apps import apps
from ..errores.handle import raise_error
from django.db import connection
from .datosGeneralesService import guardarHistorialRequerimientos


def guardarDatosNuevos(tabla_nombre, datos):
    modelo = apps.get_model('api', tabla_nombre)
    if not modelo:
        raise_error("E004", f"No se encontró el modelo '{tabla_nombre}' en la app 'api'")

    resultados = []
    insert_ids = []

    for fila in datos:
        instancia = modelo(**fila)
        instancia.save()

        # Guardar el id insertado
        insert_ids.append(instancia.pk)

        data_insertado = {}
        for campo in modelo._meta.fields:
            valor = getattr(instancia, campo.name)
            if hasattr(valor, 'pk'):
                valor = valor.pk
            data_insertado[campo.name] = valor
        resultados.append(data_insertado)

    ejecutarPostInserts(tabla_nombre, insert_ids)

    return resultados

def ejecutarPostInserts(tabla_nombre, insert_ids):
    if not insert_ids:
        return

    primerid = insert_ids[0]

    with connection.cursor() as cursor:
        if tabla_nombre.lower() == "datosgeneralesdelproceso":
            req = {}
            cursor.execute("CALL cod_insert_requerimiento(%s)", [primerid])
            guardarHistorialRequerimientos(1,primerid,True)

        elif tabla_nombre.lower() == "datosgeneralesordencompraaproveedores":
            cursor.execute("CALL cod_insert_ocproveedor(%s)", [primerid])
