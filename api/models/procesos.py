from django.db import models

class DatosGeneralesDelProceso(models.Model):
    codReq = models.CharField(max_length=300, null=True, blank=True)
    nombreDelProducto = models.TextField(null=True, blank=True)
    prioridad = models.IntegerField(null=True, blank=True)
    contactoCliente = models.ForeignKey('Contactos', null=True, blank=True, on_delete=models.SET_NULL)
    otrosCostosConFactura = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    costosSinFactura = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    submissionDate = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(null=True, blank=True)
    lugarDeEntregaAlCliente = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.SET_NULL)
    adjuntos = models.CharField(max_length=300, blank=True, null=True)
    transporteEstimadoSoles = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    gmPorcentajeDeseado = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    productoEntregado = models.CharField(max_length=300, null=True, blank=True)    
    ediciones = models.TextField(null=True, blank=True)
    encargado = models.ForeignKey('Usuarios',blank=True,on_delete=models.CASCADE, null=True)

    TRAZA = models.AutoField(primary_key=True)

    class Meta:
        indexes = [
            models.Index(fields=['submissionDate','estado'], name='idx_datosgen_fecha_estado'),
        ]


class DatosGeneralesOCsClientes(models.Model):
    numeroDeCotizacion =models.ForeignKey('DatosGeneralesDeCotizaciones',blank=True,on_delete=models.CASCADE)
    contactoCliente =models.ForeignKey('Contactos',blank=True,on_delete=models.CASCADE)
    lugarDeEntregaAlCliente=models.ForeignKey('Lugares',null=True,blank=True,on_delete=models.CASCADE)
    numeroOcCliente = models.CharField(max_length=150, null=True, blank=True)
    estado = models.IntegerField(null=True,blank=True)
    valorSinIgv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    igv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    fechaEmision = models.DateTimeField(null=True, blank=True)
    ocClientePdf = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class DatosGeneralesOrdenCompraAProveedores(models.Model):
    noOrdenDeCompra = models.CharField(max_length=300, null=True, blank=True)

    proveedor = models.ForeignKey(
        'Contactos',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='ordenes_compra'
    )

    estado =models.IntegerField(null=True,blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    valorDeCompra = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    igv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    lugarDeEntrega = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    garantia = models.CharField(max_length=300, null=True, blank=True)
    ocPdf = models.CharField(max_length=300, null=True, blank=True)
    ocEntregada = models.DateTimeField(max_length=300, null=True, blank=True)
    observaciones = models.CharField(max_length=500, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)
    fechaActualizacion = models.DateTimeField(null=True, blank=True)
    notasDeCoordinacion = models.CharField(max_length=500,null=True, blank=True)
    
    TRAZA = models.AutoField(primary_key=True)


class DatosGeneralesDeCotizaciones(models.Model): 
    codReq = models.ForeignKey('DatosGeneralesDelProceso', null=True, blank=True, on_delete=models.CASCADE)    
    moneda = models.CharField(max_length=3, null=True, blank=True)
    numeroDeCotizacion = models.CharField(max_length=300, null=True, blank=True)
    valorDeVenta = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    igv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    validez = models.IntegerField(null = True, blank=True)
    enviada = models.DateTimeField(null=True, blank=True)
    archivo = models.CharField(max_length=300, null=True, blank=True)
    adjuntos = models.CharField(max_length=300, null=True, blank=True)
    observaciones = models.CharField(max_length=500, null=True, blank=True)
    estado = models.IntegerField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class PagosRelacionados(models.Model):
    comprobante = models.ForeignKey('ComprobantesDePago', null=False, blank=False, on_delete=models.CASCADE)
    movimiento = models.ForeignKey('MovimientosBancarios', null=True, blank=True, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class Detracciones(models.Model):
    comprobanteDePago = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL)
    fecha = models.DateTimeField(null=True, blank=True)
    valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    concepto = models.CharField(max_length=300, null=True, blank=True)
    archivo = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

