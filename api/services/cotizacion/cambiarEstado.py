from django.db import transaction
from api.models.procesos import DatosGeneralesDeCotizaciones

@transaction.atomic
def cambiar_estado_req_cotizacion_enviada(TRAZA: int) -> DatosGeneralesDeCotizaciones:
    cotizacion = DatosGeneralesDeCotizaciones.objects.select_related("codReq").get(pk=TRAZA)
    
    requerimiento = cotizacion.codReq

    ESTADO_ENVIADA = 1
    ESTADO_CANCELADA = 4

    cotizaciones_validas = requerimiento.datosgeneralesdecotizaciones_set.exclude(
        estado=ESTADO_CANCELADA
    )

    cotizaciones_no_enviadas = cotizaciones_validas.exclude(
        estado=ESTADO_ENVIADA
    ).exists()

    if not cotizaciones_no_enviadas:
        requerimiento.estado = 4
        requerimiento.save()

