from django.apps import apps
from ..errores.handle import raise_error
from django.db import transaction
from .datosGeneralesService import guardarHistorialRequerimientos


def actualizarDatos(tabla_nombre, datos_dict, filtro_dict):
    with transaction.atomic():
        guardarHistorial(tabla_nombre,datos_dict,filtro_dict)

        modelo = apps.get_model('api', tabla_nombre)
        if not modelo:
            raise_error("E004", f"No se encontro el modelo '{tabla_nombre}' en la api")
        
        objeto = modelo.objects.get(**filtro_dict)

        if "ediciones" in [field.name for field in modelo._meta.get_fields()]:
            if "ediciones" in datos_dict:
                texto_nuevo = datos_dict["ediciones"]
                texto_anterior = getattr(objeto, "ediciones", "") or ""

                datos_dict["ediciones"] = f"{texto_anterior}{texto_nuevo}"
        
        for campo, valor in datos_dict.items():
            setattr(objeto, campo, valor)
        
        objeto.save()

        return True

    return True

def guardarHistorial(tabla_nombre,datos_dict,filtro_dict):
    if tabla_nombre == "datosgeneralesdelproceso" and "estado" in datos_dict:
        return guardarHistorialRequerimientos(datos_dict,filtro_dict, False)
    