from django.db import transaction
from django.utils import timezone
from ..models import DatosGeneralesDelProceso, HistorialRequerimientos, DatosGeneralesOCsClientes
from .comprobanteService import ocClienteEstaPagada


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

def verificarEstadoRequerimiento(req):
    if req.estado != 9:   
        return
    
    ocs = DatosGeneralesOCsClientes.objects.filter(
        numeroDeCotizacion__codReq=req
    )

    if not ocs.exists():
        return

    for oc in ocs:
        if not ocClienteEstaPagada(oc):
            return

    guardarHistorialRequerimientos(
        {"estado": 10},
        {"TRAZA": req.TRAZA},
        esInsert=False
    )

    req.estado = 10
    req.save(update_fields=["estado"])

        