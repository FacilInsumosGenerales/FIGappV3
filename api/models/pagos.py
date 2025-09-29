from django.db import models

class ComprobantesDePago(models.Model):
    TIPO_CHOICES = (
        (0, 'Factura'),
        (1, 'Boleta'),
        (2, 'Ninguno'),
        (3, 'Recibo importación'),
    )
    CATEGORIA_CHOICES = (
        (0, 'Clientes'),
        (1, 'Proveedor'),
        (2, 'Logística'),
        (3, 'Costo equipo'),
        (4, 'Costos equipo'),
        (5, 'Varios'),
    )

    tipo = models.IntegerField(choices=TIPO_CHOICES, null=True, blank=True)
    categoria = models.IntegerField(choices=CATEGORIA_CHOICES, null=True, blank=True)
    proveedor = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.CASCADE)
    ocCliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.SET_NULL)
    ocProveedor = models.ForeignKey('DatosGeneralesOrdenCompraAProveedores', null=True, blank=True, on_delete=models.SET_NULL)
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    numeroDeDocumento = models.CharField(max_length=300, null=True, blank=True)
    fechaEmision = models.DateTimeField(null=True, blank=True)
    fechaVencimiento = models.DateTimeField(null=True, blank=True)
    fechaDeEnvio = models.DateTimeField(null=True, blank=True)
    valorSinIgv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    igv = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    saldo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    documentoPdf = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class MovimientosBancarios(models.Model):
    tipo = models.CharField(max_length=150, null=True, blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    concepto = models.CharField(max_length=300, null=True, blank=True)
    archivo = models.CharField(max_length=300, null=True, blank=True)
    noOperacionBancaria = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class Interbank(models.Model):
    fechaDeOperacion = models.CharField(max_length=300, null=True, blank=True)
    fechaDeProceso = models.CharField(max_length=300, null=True, blank=True)
    nroDeOperacion = models.CharField(max_length=300, null=True, blank=True)
    movimiento = models.CharField(max_length=300, null=True, blank=True)
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    canal = models.CharField(max_length=300, null=True, blank=True)
    cargo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    abono = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    saldoContable = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    conciliacion = models.ForeignKey(MovimientosBancarios, null=True, blank=True, on_delete=models.SET_NULL)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class Bcp(models.Model):
    fecha = models.DateTimeField(null=True, blank=True)
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    monto = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    saldo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    bcp = models.CharField(max_digits=300, null=True, blank=True)
    conciliacion = models.ForeignKey(MovimientosBancarios, null=True, blank=True, on_delete=models.SET_NULL)
    contable = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)
    nroDeOperacion = models.CharField(max_length=300, null=True, blank=True)
    
    TRAZA = models.AutoField(primary_key=True)


class Notas(models.Model):
    TIPO_CHOICES = (
        (0, 'Credito'),
        (1, 'Debito'),
    )
    tipo = models.IntegerField(choices=TIPO_CHOICES, null=True, blank=True)
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    comprobanteDeOrigen = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL, related_name='nota_origen')
    comprobanteDeDestino = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL, related_name='nota_destino')
    numeroNCredito = models.CharField(max_length=300, null=True, blank=True)
    fechaEmision = models.DateTimeField(null=True, blank=True)
    fechaVencimiento = models.DateTimeField(null=True, blank=True)
    fechaCancelacion = models.DateTimeField(null=True, blank=True)
    formaDePago = models.CharField(max_length=300, null=True, blank=True)
    valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    moneda = models.CharField(max_length=3, null=True, blank=True)
    notaCreditoPdf = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)









