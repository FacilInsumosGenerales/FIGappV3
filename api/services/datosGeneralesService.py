from django.db import transaction
from django.utils import timezone
from ..models import DatosGeneralesDelProceso, HistorialRequerimientos


def guardarHistorialRequerimientos(datos_dict,filtro_dict, esInsert=True):
    with transaction.atomic():
        if esInsert:
            req = DatosGeneralesDelProceso.objects.select_for_update().get(TRAZA=filtro_dict)
            estadoAnterior = None
            estadoNuevo = datos_dict
        else:
            req = DatosGeneralesDelProceso.objects.select_for_update().get(TRAZA=filtro_dict["TRAZA"])
            estadoAnterior = req.estado
            estadoNuevo = datos_dict["estado"]

        HistorialRequerimientos.objects.create(
            estadoAnterior=estadoAnterior,
            estadoNuevo=estadoNuevo,
            datosGeneralesDelProceso=req,
            fechaDeRegistro=timezone.now()
        )
