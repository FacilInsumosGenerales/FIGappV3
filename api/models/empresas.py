from django.db import models

class Empresas(models.Model):
    nombre = models.CharField(max_length=300, null=True, blank=True)
    proveedor = models.BooleanField(default=False)
    cliente = models.BooleanField(default=False)
    logistica = models.BooleanField(default=False)
    ruc = models.CharField(max_length=300, null=True, blank=True)
    telefono = models.CharField(max_length=150, null=True, blank=True)
    paginaWeb = models.CharField(max_length=600, null=True, blank=True)
    formaDePago = models.CharField(max_length=150, null=True, blank=True)
    favorito = models.BooleanField(null=True, blank=True)
    adjunto = models.CharField(max_length=300, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.nombre} {self.ruc}"
    

class Contactos(models.Model):
    empresa = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.SET_NULL)
    nombre = models.CharField(max_length=300, null=True, blank=True)
    apellido = models.CharField(max_length=300, null=True, blank=True)
    celular = models.CharField(max_length=150, null=True, blank=True)
    email = models.CharField(max_length=150, null=True, blank=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

    
class Lugares(models.Model):
    nombreDeLugar = models.CharField(max_length=150, null=True, blank=True)
    direccion = models.CharField(max_length=150, null=True, blank=True)
    departamento = models.CharField(max_length=300, null=True, blank=True)
    requisitosIngresoLocal = models.TextField(blank=True, null=True)
    horarioDeAtencion = models.CharField(max_length=300, blank=True, null=True)
    ediciones = models.TextField(blank=True, null=True)

    TRAZA = models.AutoField(primary_key=True)  

    def __str__(self):
        return f"{self.nombreDeLugar} {self.direccion}"




