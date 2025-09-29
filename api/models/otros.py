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

    TRAZA = models.AutoField(primary_key=True)



