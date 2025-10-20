from django.urls import path
from .views import ObtenerDatosView, GuardarDataView, ActualizarDataView

urlpatterns = [
    #path('guardar/', views.guardar, name='guardar'),
    #path('actualizar/', views.actualizar, name='actualizar'),
    #path('subir-archivo/', views.subir_archivo, name='subir-archivo'),
    #path('obtener_datos/', views.obtener_datos_view, name='obtener_datos'),
    path('obtenerDatos/', ObtenerDatosView.as_view(), name="obtenerDatos"),
    path('guardarDatos/', GuardarDataView.as_view(), name='guardarDatos'),
    path('actualizarDatos/', ActualizarDataView.as_view(), name='actualizarDatos')
]
