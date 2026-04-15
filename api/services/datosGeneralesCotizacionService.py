from ..models import DatosGeneralesDeCotizaciones
from .tipoCambioService import obtenerTipoCambio
from datetime import date

def asignarTipoCambioACotizacion(cotizacionId):

    cotizacion = (
        DatosGeneralesDeCotizaciones.objects
        .filter(TRAZA=cotizacionId)
        .first()
    )

    if not cotizacion:
        return

    if cotizacion.moneda == 'USD':
        valorTipoCambio = obtenerTipoCambio()
        cotizacion.tipoCambio = valorTipoCambio.get("venta")
        cotizacion.fechaTipoCambio = date.today()
        cotizacion.save(update_fields=["tipoCambio", "fechaTipoCambio"])

    if cotizacion.moneda == 'PEN':
        cotizacion.tipoCambio = 1.0000
        cotizacion.fechaTipoCambio = date.today()
        cotizacion.save(update_fields=["tipoCambio", "fechaTipoCambio"])

