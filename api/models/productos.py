from django.db import models

class Planilla(models.Model):
    codReq = models.ForeignKey('DatosGeneralesDelProceso', null=True, blank=True, on_delete=models.SET_NULL)
    categoria = models.CharField(max_length=150, null=True, blank=True)
    productoSolicitado = models.TextField(null=True, blank=True)
    marca = models.CharField(max_length=300, null=True, blank=True)
    modelo = models.CharField(max_length=300, null=True, blank=True)
    medida = models.CharField(max_length=150, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class BdCotizacionesDeProveedores(models.Model):
    cotizacion = models.ForeignKey('CotizacionesProveedores', null=True, blank=True, on_delete=models.CASCADE)
    productoSolicitado = models.ForeignKey('Planilla', null=True, blank=True, on_delete=models.CASCADE)
    descripcionProveedor = models.TextField(null=True, blank=True)
    descripcionCliente = models.TextField(null=True, blank=True)
    marca = models.CharField(max_length=300, null=True, blank=True)
    modelo = models.CharField(max_length=300, null=True, blank=True)
    pesoKg = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    volumenM3 = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    diasEntregaProveedor = models.IntegerField(null=True, blank=True)
    diasEntregaCliente = models.IntegerField(null=True, blank=True)
    medida = models.CharField(max_length=300, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    costoXUnidadSinIgvEnMonedaDeOferta = models.DecimalField(max_digits=13, decimal_places=4, null=True, blank=True)
    precioVentaXUnidadSinIgvEnMonedaDeOferta = models.DecimalField(max_digits=13, decimal_places=4, null=True, blank=True)
    link = models.CharField(max_length=1200, null=True, blank=True)
    #habilitarYDeshabilitar = models.CharField(max_length=150, null=True, blank=True)
    adjuntoFichaTecnica = models.CharField(max_length=300, null=True, blank=True)
    imagenReferencial = models.CharField(max_length=300, null=True, blank=True)
    imagenCotizacion = models.CharField(max_length=300, null=True, blank=True)
    esImportacionDirecta = models.IntegerField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)
    garantia = models.IntegerField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class ProductosCotizacion(models.Model):
    cotizacionProveedor = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    cotizacionCliente = models.ForeignKey('DatosGeneralesDeCotizaciones', null=True, blank=True, on_delete=models.CASCADE)

    TRAZA = models.AutoField(primary_key=True)

    def __str__(self):
            return f"Proveedor: {self.cotizacionProveedor} - Cliente: {self.cotizacionCliente}"


class ProductosEnLogistica(models.Model):
    ocCliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    producto = models.ForeignKey('ProductosEnOCProveedor', null=False, blank=False, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    destinoFinal = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    fechaEntregaCliente = models.DateTimeField(null=True, blank=True)
    fechaEntregaProveedor = models.DateTimeField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)
    etiqueta = models.CharField(max_length=300, null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class ProductosEnMovimiento(models.Model):
    producto = models.ForeignKey('ProductosEnLogistica', null=True, blank=True, on_delete=models.CASCADE)
    #Grupo = models.ForeignKey('GruposLogistica', null=True, blank=True, on_delete=models.CASCADE)
    movimiento = models.ForeignKey('MovimientosLogisticos', null=False, blank=False, on_delete=models.CASCADE)

    TRAZA = models.AutoField(primary_key=True)


class ProductosEnOCCliente(models.Model):
    productoCotizado = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    ocCliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    fechaEntregaMaxima = models.DateTimeField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class ProductosEnOCProveedor(models.Model):
    productoCotizado = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    ocProveedor = models.ForeignKey('DatosGeneralesOrdenCompraAProveedores', null=True, blank=True, on_delete=models.CASCADE)
    productoOcCliente = models.ForeignKey('ProductosEnOCCliente', null=True, blank=True, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    stock = models.BooleanField(null=True, blank=True)
    fechaEntregaMaxima = models.DateTimeField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


