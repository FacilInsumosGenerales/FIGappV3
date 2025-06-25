from django.contrib import admin
from .models import Reuniones, Usuarios, Asistencia, MovimientosBancarios

# Register your models here.
admin.site.register(Reuniones)
admin.site.register(Usuarios)
admin.site.register(Asistencia)
admin.site.register(MovimientosBancarios)