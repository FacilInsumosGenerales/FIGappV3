from django.contrib import admin
from .models import contactos, datos_generales_del_proceso, empresas, lugares, empresas

# Register your models here.
admin.site.register(empresas)
admin.site.register(contactos)
admin.site.register(lugares)
admin.site.register(datos_generales_del_proceso)