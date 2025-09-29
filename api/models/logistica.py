from django.db import models

class MovimientosLogisticos(models.Model):
    lugarInicial = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE, related_name='movimientos_iniciales')
    lugarFinal = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE, related_name='movimientos_finales')
    pesoKg = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    volumenM3 = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    paletizado = models.BooleanField(default=False)
    fechaPlaneada = models.DateTimeField(null=True, blank=True)
    fechaReal = models.DateTimeField(null=True, blank=True)
    transportista = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.CASCADE)
    folderImagenes = models.CharField(max_length=300, null=True, blank=True)
    estado = models.IntegerField(default=0)
    movimientoBancario = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.CASCADE)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class GuiasEmitidas(models.Model):
    OC_de_cliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    Numero_Guia = models.CharField(max_length=300, null=True, blank=True)
    Guia_sin_firma_PDF = models.CharField(max_length=300, null=True, blank=True)
    Guia_firmada_PDF = models.CharField(max_length=300, null=True, blank=True)
    Fecha_Emision = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


    