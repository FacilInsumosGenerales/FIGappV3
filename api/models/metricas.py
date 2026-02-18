from django.db import models

class HistorialRequerimientos(models.Model):
    estadoNuevo = models.IntegerField(null=True, blank=True)
    estadoAnterior = models.IntegerField(null=True, blank=True)
    datosGeneralesDelProceso = models.ForeignKey('DatosGeneralesDelProceso', null=True, blank=True, on_delete=models.CASCADE)
    fechaDeRegistro = models.DateTimeField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)
