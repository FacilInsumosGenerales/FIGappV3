from django.db import models

class CotizacionesProveedores(models.Model):
    moneda = models.CharField(max_length=3, null=True, blank=True)
    contactoProveedor = models.ForeignKey('Contactos', null=True, blank=True, on_delete=models.CASCADE)
    adjunto = models.CharField(max_length=300, null=True, blank=True)
    fechaDeRegistro = models.DateTimeField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class Reclamos(models.Model):
    producto = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    descripcionReclamo = models.TextField(null=True, blank=True)
    archivoReclamo = models.CharField(max_length=300, null=True, blank=True)
    fechaReclamo = models.DateTimeField(null=True, blank=True)
    descripcionResolucion = models.TextField(null=True, blank=True)
    archivoResolucion = models.CharField(max_length=300, null=True, blank=True)
    fechaResolucion = models.DateTimeField(null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)
    estado = models.IntegerField(null=True,blank=True)

    TRAZA = models.AutoField(primary_key=True)


class TablaPrueba(models.Model):
    descripcion = models.CharField(max_length=300, null=True, blank=True)
    codigoBarra = models.TextField(null=True, blank=True)
    stock = models.IntegerField(null=True, blank=True)
    anaquel = models.IntegerField(null=True, blank=True)
    fechaIngreso = models.DateTimeField(null=True, blank=True)
    fechaModificacion = models.DateTimeField(null=True, blank=True)
    precio = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class TipoDeCambio(models.Model):
    MONEDAS = (
        (1, 'PEN'),
        (2, 'EUR'),
        (3, 'USD')
    )

    moneda = models.PositiveSmallIntegerField(choices=MONEDAS)
    fecha = models.DateField(db_index=True)
    compra = models.DecimalField(max_digits=10, decimal_places=4)
    venta = models.DecimalField(max_digits=10, decimal_places=4)
    creadoEn = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('moneda', 'fecha')
        indexes = [
            models.Index(fields=['moneda', 'fecha']),
        ]

    def __str__(self):
        return f"{self.get_moneda_display()} - {self.fecha}"
    

