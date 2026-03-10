from django.db.models import Sum
from ..models import PagosRelacionados, Notas, Detracciones, ComprobantesDePago


def calcularSaldoFactura(factura):
    total = (factura.valorSinIgv or 0) + (factura.igv or 0)

    pagos = PagosRelacionados.objects.filter(
        comprobante_id=factura.TRAZA
    ).aggregate(total=Sum("monto"))["total"] or 0

    notas_credito = Notas.objects.filter(
        comprobanteDeDestino_id=factura.TRAZA,
        tipo=0 
    ).aggregate(total=Sum("valor"))["total"] or 0

    notas_debito = Notas.objects.filter(
        comprobanteDeOrigen_id=factura.TRAZA,
        tipo=1
    ).aggregate(total=Sum("valor"))["total"] or 0

    detracciones = Detracciones.objects.filter(
        comprobanteDePago_id=factura.TRAZA
    ).aggregate(total=Sum("valor"))["total"] or 0

    saldo = total - pagos - notas_credito + notas_debito - detracciones
    
    return saldo

def ocClienteEstaPagada(occliente):
    facturas = ComprobantesDePago.objects.filter(
        ocCliente=occliente
    )
    for factura in facturas:
        saldo = calcularSaldoFactura(factura)

        if saldo > 0:
            return False
    return True

def obtenerFacturasDePago(trazaPago):
    pagos = PagosRelacionados.objects.filter(TRAZA=trazaPago)

    facturas = []
    for pago in pagos:
        facturas.append(pago.comprobante)

    return facturas

