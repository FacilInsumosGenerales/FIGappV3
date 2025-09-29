from django.db import models

class Usuarios(models.Model):
    email = models.CharField(max_length=300, null=True, blank=True)
    usuario = models.CharField(max_length=300, null=True, blank=True)
    emailPersonal = models.CharField(max_length=300, null=True, blank=True)
    nombre = models.CharField(max_length=300, null=True, blank=True)
    segundoNombre = models.CharField(max_length=300, null=True, blank=True)
    apellido = models.CharField(max_length=300, null=True, blank=True)
    telefono = models.CharField(max_length=150, null=True, blank=True)
    dni = models.CharField(max_length=300, null=True, blank=True)
    rol = models.CharField(max_length=150, null=True, blank=True)
    fechaDeNacimiento = models.DateTimeField(null=True, blank=True)
    password = models.CharField(max_length=300, null=True, blank=True)
    banco = models.CharField(max_length=300, null=True, blank=True)
    ctaBancaria = models.CharField(max_length=300, null=True, blank=True)
    activo = models.BooleanField(default=True)
    ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.nombre} {self.segundoNombre} {self.apellido}"
    
