from django.db import models

class ComprobantesDePagoTotales(models.Model):
    Comprobante = models.IntegerField(primary_key=True)  # Define la PK que tenga tu vista
    ocCliente = models.CharField(max_length=300)
    totalPagado = models.IntegerField()
    totalDetraccion = models.CharField(max_length=300)
    totalNotas = models.TextField(max_length=255)

    class Meta:
        managed = False  # IMPORTANTE: Django no intentará crear/migrar esta tabla
        db_table = "vistaComprobantesDePagoTotales"  # Nombre de la vista en MySQL


