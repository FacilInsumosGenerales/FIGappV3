from django.urls import path
from .views import ObtenerDataView, GuardarDataView, ActualizarDataView, SubirArchivoView, EjecutarProcedimiento, ValidarUsuario

urlpatterns = [
    path('obtenerDatos/', ObtenerDataView.as_view(), name="obtenerDatos"),
    path('guardarDatos/', GuardarDataView.as_view(), name='guardarDatos'),
    path('actualizarDatos/', ActualizarDataView.as_view(), name='actualizarDatos'),
    path('subirArchivo/', SubirArchivoView.as_view(), name="subirArchivo"),
    path('ejecutarProcedimiento/', EjecutarProcedimiento.as_view(), name="ejecutarProcedimiento"),
    path('validarUsuario/', ValidarUsuario.as_view(), name="validarUsuario")
]
