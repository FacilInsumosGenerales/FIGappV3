from django.apps import apps
from ..errores.handle import raise_error
from django.db import connection


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
            cursor.execute("CALL cod_insert_requerimiento(%s)", [primerid])

        elif tabla_nombre.lower() == "datosgeneralesordencompraproveedores":
            cursor.execute("CALL cod_insert_ocproveedor(%s)", [primerid])

def actualizarDatos(tabla_nombre, datos_dict, filtro_dict):
        modelo = apps.get_model('api', tabla_nombre)
        if not modelo:
            raise_error("E004", f"No se encontro el modelo '{tabla_nombre}' en la api")
        
        objeto = modelo.objects.get(**filtro_dict)

        if "edicion" in [field.name for field in modelo._meta.get_fields()]:
            if "edicion" in datos_dict:
                texto_nuevo = datos_dict["edicion"]
                texto_anterior = getattr(objeto, "edicion", "") or ""

                datos_dict["edicion"] = f"{texto_anterior}{texto_nuevo}"
        
        for campo, valor in datos_dict.items():
            setattr(objeto, campo, valor)
        
        objeto.save()

        return True

def obtener_datos_con_relaciones(tabla_nombre, columnas, filtros=None):
    try:
        modelo = apps.get_model('api', tabla_nombre)

        # Si tiene relaciones, usa select_related para obtener los datos relacionados
        consulta = modelo.objects.all()

        # Aplicar filtros si es necesario
        if filtros:
            consulta = consulta.filter(**filtros)

        # Usar select_related para cargar la relación
        consulta = consulta.select_related(*columnas)

        # Obtener los datos solicitados
        resultados = consulta.values(*columnas)

        return {"datos": list(resultados), "status": 200}
    
    except Exception as e:
        return {"mensaje": f"Error al obtener los datos: {str(e)}", "status": 500}

