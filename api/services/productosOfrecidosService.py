from django.apps import apps
from ..errores.handle import raise_error
from django.db import transaction
from ..models import BdCotizacionesDeProveedores


def duplicarProductoOfrecido(traza):
    producto = BdCotizacionesDeProveedores.objects.get(pk=traza)
    producto.pk = None
    producto.save()

    return producto
 
