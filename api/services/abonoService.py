from ..models import PagosRelacionados
from .datosGeneralesService import verificarEstadoRequerimiento


def servicioAbonoFactura(abonoId):
    abono = (
        PagosRelacionados.objects.select_related(
            "comprobante",
            "comprobante__ocCliente",
            "comprobante__ocCliente__numeroDeCotizacion",
            "comprobante__ocCliente__numeroDeCotizacion__codReq"
        )
        .filter(TRAZA=abonoId)
        .first()
    )

    if not abono:
        return

    factura = abono.comprobante

    if not factura or not factura.ocCliente_id:
        return

    req = factura.ocCliente.numeroDeCotizacion.codReq

    verificarEstadoRequerimiento(req)

