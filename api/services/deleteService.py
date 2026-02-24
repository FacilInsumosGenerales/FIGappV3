from django.apps import apps
from ..errores.handle import raise_error
from django.db import transaction


def eliminarDatos(tabla_nombre, traza):
    with transaction.atomic():
        modelo = apps.get_model('api', tabla_nombre)
        if not modelo:
            raise_error("E004", f"No se encontro el modelo '{tabla_nombre}' en la api")

        if not traza:
            raise_error("E004","No se encontro traza")
        
        objeto = modelo.objects.get(TRAZA=traza)

        objeto.delete()

        return True