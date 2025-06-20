from django.db import models

class empresas(models.Model):
    nombre = models.CharField(max_length=255)
    proveedor = models.BooleanField(default=False)
    cliente = models.BooleanField(default=False)
    logistica = models.BooleanField(default=False)
    ruc = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    paginaWeb = models.CharField(max_length=255, blank=True, null=True)
    formaPago = models.CharField(max_length=255, blank=True, null=True)
    favorito = models.BooleanField(default=False)
    adjunto = models.CharField(max_length=255, blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    traza = models.TextField(blank=True, null=True)  # Por ahora lo tratamos como texto

    def __str__(self):
        return self.nombre

class contactos(models.Model):
    empresa = models.ForeignKey(empresas, on_delete=models.CASCADE, related_name='contactos')
    nombre = models.TextField()
    apellido = models.TextField()
    celular = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    ediciones = models.TextField(blank=True, null=True)
    traza = models.TextField(blank=True, null=True)  # Como antes, asumimos texto hasta saber más

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.empresa.nombre})"
    

class lugares(models.Model):
    nombre = models.TextField()
    direccion = models.TextField()
    departamento = models.TextField(blank=True, null=True)
    requisitosIngreso = models.TextField(blank=True, null=True)
    horarioAtencion = models.TextField(blank=True, null=True)
    ediciones = models.TextField(blank=True, null=True)
    traza = models.IntegerField(blank=True, null=True)  # Asumido como un número, puedes ajustar esto luego

    def __str__(self):
        return self.nombre


class datos_generales_del_proceso(models.Model):
    codReq = models.CharField("Código de Requerimiento", max_length=255)
    nombreProducto = models.TextField("Nombre del Producto")
    prioridad = models.CharField("Prioridad", max_length=100, default="Baja")
    contactoCliente = models.ForeignKey(contactos, on_delete=models.PROTECT, verbose_name="Contacto Cliente")
    otrosCostosFactura = models.DecimalField("Otros Costos con Factura", max_digits=10, decimal_places=2, null=True, blank=True)
    costosSinFactura = models.DecimalField("Costos sin Factura", max_digits=10, decimal_places=2, null=True, blank=True)
    fechaRegistro = models.DateTimeField("Fecha de Registro")
    estado = models.CharField("Estado", max_length=100, default="1")
    lugarEntrega = models.ForeignKey(lugares, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Lugar de Entrega al Cliente")
    adjuntos = models.FileField("Adjuntos", upload_to="adjuntos/", null=True, blank=True)
    transporteEstimado = models.DecimalField("Transporte Estimado (S/.)", max_digits=10, decimal_places=2, null=True, blank=True)
    gmPorcentaje = models.DecimalField("GM % Deseado", max_digits=5, decimal_places=2, null=True, blank=True)
    productoEntregado = models.BooleanField("Producto Entregado", default=False)
    ediciones = models.TextField("Historial de Ediciones", blank=True, null=True)
    traza = models.IntegerField("TRAZA", blank=True, null=True)  # O personaliza esto si es más complejo

    def __str__(self):
        return f"{self.cod_req} - {self.nombre_producto}"
