from django.db import models

class Reuniones(models.Model):
    Asunto = models.CharField(max_length=300, null=True, blank=True)
    Fecha = models.DateTimeField(null=True, blank=True)
    Proxima_reunion = models.DateTimeField(null=True, blank=True)
    Observaciones = models.TextField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Usuarios(models.Model):
    Email = models.CharField(max_length=300, null=True, blank=True)
    Usuario = models.CharField(max_length=300, null=True, blank=True)
    Email_personal = models.CharField(max_length=300, null=True, blank=True)
    Nombre = models.CharField(max_length=300, null=True, blank=True)
    Segundo_nombre = models.CharField(max_length=300, null=True, blank=True)
    Apellido = models.CharField(max_length=300, null=True, blank=True)
    Telefono = models.CharField(max_length=150, null=True, blank=True)
    DNI = models.CharField(max_length=300, null=True, blank=True)
    Rol = models.CharField(max_length=150, null=True, blank=True)
    Fecha_de_Nacimiento = models.DateTimeField(null=True, blank=True)
    Password = models.CharField(max_length=300, null=True, blank=True)
    Banco = models.CharField(max_length=300, null=True, blank=True)
    Cta_Bancaria = models.CharField(max_length=300, null=True, blank=True)
    Activo = models.BooleanField(default=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Asistencia(models.Model):
    Reunion = models.ForeignKey('Reuniones', null=True, blank=True, on_delete=models.SET_NULL)
    Persona = models.ForeignKey('Usuarios', null=True, blank=True, on_delete=models.SET_NULL)

    TRAZA = models.AutoField(primary_key=True)

class MovimientosBancarios(models.Model):
    Tipo = models.CharField(max_length=150, null=True, blank=True)
    Fecha = models.DateTimeField(null=True, blank=True)
    Valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Concepto = models.CharField(max_length=300, null=True, blank=True)
    Archivo = models.CharField(max_length=300, null=True, blank=True)
    No_Operacion_Bancaria = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class BCP(models.Model):
    Fecha = models.CharField(max_length=300, null=True, blank=True)
    Descripcion = models.CharField(max_length=300, null=True, blank=True)
    Monto = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Saldo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    BCP = models.CharField(max_length=300, null=True, blank=True)
    Conciliacion = models.ForeignKey(MovimientosBancarios, null=True, blank=True, on_delete=models.CASCADE)
    Contable = models.IntegerField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)
    Numero_de_operacion = models.CharField(max_length=255, null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Interbank(models.Model):
    Fecha_de_operacion = models.CharField(max_length=300, null=True, blank=True)
    Fecha_de_proceso = models.CharField(max_length=300, null=True, blank=True)
    Nro_de_operacion = models.CharField(max_length=300, null=True, blank=True)
    Movimiento = models.CharField(max_length=300, null=True, blank=True)
    Descripcion = models.CharField(max_length=300, null=True, blank=True)
    Canal = models.CharField(max_length=300, null=True, blank=True)
    Cargo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Abono = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Saldo_contable = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Conciliacion = models.ForeignKey(MovimientosBancarios, null=True, blank=True, on_delete=models.SET_NULL)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Empresas(models.Model):
    Nombre = models.CharField(max_length=300, null=True, blank=True)
    Proveedor = models.BooleanField(default=False)
    Cliente = models.BooleanField(default=False)
    Logistica = models.BooleanField(default=False)
    RUC = models.CharField(max_length=300, null=True, blank=True)
    Telefono = models.CharField(max_length=150, null=True, blank=True)
    Pagina_Web = models.CharField(max_length=600, null=True, blank=True)
    Forma_de_pago = models.CharField(max_length=150, null=True, blank=True)
    Favorito = models.BooleanField(null=True, blank=True)
    Adjunto = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Contactos(models.Model):
    Empresa = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.SET_NULL)
    Nombre = models.CharField(max_length=300, null=True, blank=True)
    Apellido = models.CharField(max_length=300, null=True, blank=True)
    Celular = models.CharField(max_length=150, null=True, blank=True)
    Email = models.CharField(max_length=150, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class CotizacionesProveedores(models.Model):
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Contacto_proveedor = models.ForeignKey('Contactos', null=True, blank=True, on_delete=models.CASCADE)
    Adjunto = models.CharField(max_length=300, null=True, blank=True)
    Fecha_de_Registro = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class BdCotizacionesDeProveedores(models.Model):
    Cotizacion = models.ForeignKey('CotizacionesProveedores', null=True, blank=True, on_delete=models.CASCADE)
    Producto_Solicitado = models.ForeignKey('Planilla', null=True, blank=True, on_delete=models.CASCADE)
    Descripcion_proveedor = models.TextField(null=True, blank=True)
    Descripcion_cliente = models.TextField(null=True, blank=True)
    Marca = models.CharField(max_length=300, null=True, blank=True)
    Modelo = models.CharField(max_length=300, null=True, blank=True)
    Peso_kg = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Volumen_m3 = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Dias_entrega_proveedor = models.IntegerField(null=True, blank=True)
    Dias_entrega_cliente = models.IntegerField(null=True, blank=True)
    Medida = models.CharField(max_length=300, null=True, blank=True)
    Cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Costo_x_Unidad_SIN_IGV_en_moneda_de_oferta = models.DecimalField(max_digits=13, decimal_places=4, null=True, blank=True)
    Precio_Venta_x_Unidad_SIN_IGV_en_moneda_de_oferta = models.DecimalField(max_digits=13, decimal_places=4, null=True, blank=True)
    Link = models.CharField(max_length=1200, null=True, blank=True)
    Habilitar_y_Deshabilitar = models.CharField(max_length=150, null=True, blank=True)
    Adjunto_Ficha_Tecnica = models.CharField(max_length=300, null=True, blank=True)
    Imagen_Referencial = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Grupos(models.Model):
    Descripcion = models.CharField(max_length=150, null=True, blank=True)
    Cantidad = models.IntegerField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Lugares(models.Model):
    Nombre_de_lugar = models.TextField()
    Direccion = models.TextField()
    Departamento = models.TextField(blank=True, null=True)
    Requisitos_Ingreso_Local = models.TextField(blank=True, null=True)
    Horario_de_atencion = models.TextField(blank=True, null=True)
    Ediciones = models.TextField(blank=True, null=True)
    TRAZA = models.AutoField(primary_key=True)  
    
class DatosGeneralesDelProceso(models.Model):
    Cod_Req = models.CharField(max_length=300, null=True, blank=True)
    Nombre_del_producto = models.CharField(max_length=600, null=True, blank=True)
    Prioridad = models.CharField(max_length=300, null=True, blank=True)
    Contacto_Cliente = models.ForeignKey('Contactos', null=True, blank=True, on_delete=models.SET_NULL)
    Otros_Costos_con_factura = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    Costos_sin_factura = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    Submission_Date = models.DateTimeField(null=True, blank=True)
    Estado = models.CharField(max_length=300, null=True, blank=True)
    Lugar_de_entrega_al_cliente = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.SET_NULL)
    Adjuntos = models.CharField(max_length=255, blank=True, null=True)
    Transporte_estimado_soles = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    Gm_porcentaje_deseado = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    Producto_entregado = models.CharField(max_length=600, null=True, blank=True)    
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Planilla(models.Model):
    Cod_Req = models.ForeignKey('DatosGeneralesDelProceso', null=True, blank=True, on_delete=models.SET_NULL)
    Grupo = models.ForeignKey('Grupos', null=True, blank=True, on_delete=models.SET_NULL)
    Categoria = models.CharField(max_length=150, null=True, blank=True)
    Producto_Solicitado = models.TextField(null=True, blank=True)
    Marca = models.CharField(max_length=300, null=True, blank=True)
    Modelo = models.CharField(max_length=300, null=True, blank=True)
    Medida = models.CharField(max_length=150, null=True, blank=True)
    Cantidad = models.IntegerField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class DatosGeneralesOCsClientes(models.Model):
    Numero_de_Cotizacion =models.IntegerField(null=True,blank=True)
    Contacto_cliente =models.ForeignKey('Contactos',blank=True,on_delete=models.CASCADE)
    Lugar_de_entrega_al_cliente=models.ForeignKey('Lugares',null=True,blank=True,on_delete=models.CASCADE)
    Numero_OC_Cliente = models.CharField(max_length=150, null=True, blank=True)
    Estado = models.IntegerField(null=True,blank=True)
    Valor_sin_IGV = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    IGV = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    Fecha_Emision = models.DateTimeField(null=True, blank=True)
    OC_Cliente_PDF = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class DatosGeneralesOrdenCompraAProveedores(models.Model):
    No_Orden_de_Compra = models.CharField(max_length=300, null=True, blank=True)
    Proveedor = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.CASCADE)
    Estado =models.IntegerField(null=True,blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Valor_de_compra = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    IGV = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Lugar_de_entrega = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    Garantia = models.CharField(max_length=300, null=True, blank=True)
    OC_pdf = models.CharField(max_length=300, null=True, blank=True)
    OC_entregada = models.CharField(max_length=300, null=True, blank=True)
    Observaciones = models.CharField(max_length=500, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)
    Fecha_actualizacion = models.DateTimeField(null=True, blank=True)
    
    TRAZA = models.AutoField(primary_key=True)

class Planilla(models.Model):
    Cod_Req = models.ForeignKey('DatosGeneralesDelProceso', null=True, blank=True, on_delete=models.CASCADE)
    Grupo = models.ForeignKey('Grupos', null=True, blank=True, on_delete=models.CASCADE)
    Categoria = models.CharField(max_length=150, null=True, blank=True)
    Producto_Solicitado = models.TextField(null=True, blank=True)
    Marca = models.CharField(max_length=300, null=True, blank=True)
    Modelo = models.CharField(max_length=300, null=True, blank=True)
    Medida = models.CharField(max_length=150, null=True, blank=True)
    Cantidad = models.IntegerField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

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

    Tipo = models.IntegerField(choices=TIPO_CHOICES, null=True, blank=True)
    Categoria = models.IntegerField(choices=CATEGORIA_CHOICES, null=True, blank=True)
    Proveedor = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.CASCADE)
    OC_cliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.SET_NULL)
    OC_proveedor = models.ForeignKey('DatosGeneralesOrdenCompraAProveedores', null=True, blank=True, on_delete=models.SET_NULL)
    Descripcion = models.CharField(max_length=300, null=True, blank=True)
    Numero_de_documento = models.CharField(max_length=300, null=True, blank=True)
    Fecha_Emision = models.DateTimeField(null=True, blank=True)
    Fecha_Vencimiento = models.DateTimeField(null=True, blank=True)
    Fecha_de_Envio = models.DateTimeField(null=True, blank=True)
    Valor_sin_IGV = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    IGV = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Saldo = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Documento_PDF = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class PagosAProveedores(models.Model):
    Proveedor = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.SET_NULL)
    OC_proveedor = models.ForeignKey('DatosGeneralesOrdenCompraAProveedores', null=True, blank=True, on_delete=models.SET_NULL)
    Fecha_pago = models.DateTimeField(null=True, blank=True)
    Monto_pagado = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Medio_pago = models.CharField(max_length=150, null=True, blank=True)
    Documento = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Reclamos(models.Model):
    Producto = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    Descripcion_reclamo = models.TextField(null=True, blank=True)
    Archivo_reclamo = models.CharField(max_length=300, null=True, blank=True)
    Fecha_reclamo = models.DateTimeField(null=True, blank=True)
    Descripcion_resolucion = models.TextField(null=True, blank=True)
    Archivo_resolucion = models.CharField(max_length=300, null=True, blank=True)
    Fecha_resolucion = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class DatosGeneralesDeCotizaciones(models.Model): ## REVISAR
    Cod_Req = models.ForeignKey('', null=True, blank=True, on_delete=models.CASCADE)    
    Cod_Cot = models.CharField(max_length=300, null=True, blank=True)
    Nombre_del_producto = models.CharField(max_length=600, null=True, blank=True)
    Contacto_Cliente = models.ForeignKey('Contactos', null=True, blank=True, on_delete=models.SET_NULL)
    Submission_Date = models.DateTimeField(null=True, blank=True)
    Estado = models.CharField(max_length=300, null=True, blank=True)
    Lugar_de_entrega_al_cliente = models.ForeignKey('Lugar', null=True, blank=True, on_delete=models.CASCADE)
    Cliente = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.SET_NULL)
    Tipo = models.CharField(max_length=300, null=True, blank=True)
    Area = models.CharField(max_length=300, null=True, blank=True)
    Tipo_de_entrega = models.CharField(max_length=300, null=True, blank=True)
    Uso = models.CharField(max_length=300, null=True, blank=True)
    Tipo_de_moneda = models.CharField(max_length=3, null=True, blank=True)
    Urgencia = models.CharField(max_length=300, null=True, blank=True)
    Proyecto = models.CharField(max_length=300, null=True, blank=True)
    Otros_costos = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Observaciones = models.TextField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Detracciones(models.Model):
    Comprobante_de_pago = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL)
    Fecha = models.DateTimeField(null=True, blank=True)
    Valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Concepto = models.CharField(max_length=300, null=True, blank=True)
    Archivo = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class GruposLogistica(models.Model):
    Nombre_de_grupo = models.IntegerField(null=True, blank=True)
    Imagen = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class GuiasEmitidas(models.Model):
    OC_de_cliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    Numero_Guia = models.CharField(max_length=300, null=True, blank=True)
    Guia_sin_firma_PDF = models.CharField(max_length=300, null=True, blank=True)
    Guia_firmada_PDF = models.CharField(max_length=300, null=True, blank=True)
    Fecha_Emision = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class HistorialCambiosEstado(models.Model):
    Estado_anterior = models.IntegerField(null=True, blank=True)
    Estado_nuevo = models.IntegerField(null=True, blank=True)
    Nombre_Usuario = models.CharField(max_length=300, null=True, blank=True)
    Fecha_y_hora_de_cambio = models.DateTimeField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class MovimientosLogisticos(models.Model):
    Lugar_inicial = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    Lugar_final = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    Peso_kg = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Volumen_m3 = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Paletizado = models.BooleanField(default=False)
    Fecha_planeada = models.DateTimeField(null=True, blank=True)
    Fecha_real = models.DateTimeField(null=True, blank=True)
    Transportista = models.ForeignKey('Empresas', null=True, blank=True, on_delete=models.CASCADE)
    Folder_imagenes = models.CharField(max_length=300, null=True, blank=True)
    Estado = models.IntegerField(default=0)
    Movimiento_bancario = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.CASCADE)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class Notas(models.Model):
    TIPO_CHOICES = (
        (0, 'Credito'),
        (1, 'Debito'),
    )
    Tipo = models.IntegerField(choices=TIPO_CHOICES, null=True, blank=True)
    Descripcion = models.CharField(max_length=300, null=True, blank=True)
    Comprobante_de_origen = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL, related_name='nota_origen')
    Comprobante_de_destino = models.ForeignKey('ComprobantesDePago', null=True, blank=True, on_delete=models.SET_NULL, related_name='nota_destino')
    Numero_NCredito = models.CharField(max_length=300, null=True, blank=True)
    Fecha_Emision = models.DateTimeField(null=True, blank=True)
    Fecha_Vencimiento = models.DateTimeField(null=True, blank=True)
    Fecha_Cancelacion = models.DateTimeField(null=True, blank=True)
    Forma_de_Pago = models.CharField(max_length=300, null=True, blank=True)
    Valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Nota_Credito_PDF = models.CharField(max_length=300, null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class PagosRelacionados(models.Model):
    Comprobante = models.ForeignKey('ComprobantesDePago', null=False, blank=False, on_delete=models.CASCADE)
    Movimiento = models.ForeignKey('MovimientosBancarios', null=True, blank=True, on_delete=models.CASCADE)
    Monto = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)


class ProductosCotizacion(models.Model):
    Cotizacion_Proveedor = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    Cotizacion_Cliente = models.ForeignKey('DatosGeneralesDeCotizaciones', null=True, blank=True, on_delete=models.CASCADE)

    TRAZA = models.AutoField(primary_key=True)

class ProductosEnGrupo(models.Model):
    Grupo = models.ForeignKey('GruposLogistica', null=False, blank=False, on_delete=models.CASCADE)
    Producto = models.ForeignKey('Planilla', null=False, blank=False, on_delete=models.CASCADE)
    Cantidad_de_producto = models.IntegerField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class ProductosEnOCCliente(models.Model):
    Producto_cotizado = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    OC_cliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    Cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Fecha_entrega_maxima = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class ProductosEnOCProveedor(models.Model):
    Producto_cotizado = models.ForeignKey('BdCotizacionesDeProveedores', null=True, blank=True, on_delete=models.CASCADE)
    OC_proveedor = models.ForeignKey('DatosGeneralesOrdenCompraAProveedores', null=True, blank=True, on_delete=models.CASCADE)
    Producto_OC_Cliente = models.ForeignKey('ProductosEnOCCliente', null=True, blank=True, on_delete=models.CASCADE)
    Cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Stock = models.BooleanField(null=True, blank=True)
    Fecha_entrega_maxima = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class ProductosEnLogistica(models.Model):
    OC_cliente = models.ForeignKey('DatosGeneralesOCsClientes', null=True, blank=True, on_delete=models.CASCADE)
    Producto = models.ForeignKey('ProductosEnOCProveedor', null=False, blank=False, on_delete=models.CASCADE)
    Cantidad = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Destino_final = models.ForeignKey('Lugares', null=True, blank=True, on_delete=models.CASCADE)
    Fecha_entrega_cliente = models.DateTimeField(null=True, blank=True)
    Fecha_entrega_proveedor = models.DateTimeField(null=True, blank=True)
    Ediciones = models.TextField(null=True, blank=True)
    Etiqueta = models.CharField(max_length=300, null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

class ProductosEnMovimiento(models.Model):
    Producto = models.ForeignKey('ProductosEnLogistica', null=True, blank=True, on_delete=models.CASCADE)
    Grupo = models.ForeignKey('GruposLogistica', null=True, blank=True, on_delete=models.CASCADE)
    Movimiento = models.ForeignKey('MovimientosLogisticos', null=False, blank=False, on_delete=models.CASCADE)

    TRAZA = models.AutoField(primary_key=True)

class TipoDeCambio(models.Model):
    Valor = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    Moneda = models.CharField(max_length=3, null=True, blank=True)
    Fecha = models.DateTimeField(null=True, blank=True)

    TRAZA = models.AutoField(primary_key=True)

""" 
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
 """