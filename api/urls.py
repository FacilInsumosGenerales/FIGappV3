from django.urls import path
from . import views

urlpatterns = [
    path('guardar/', views.guardar, name='guardar'),
    path('actualizar/', views.actualizar, name='actualizar'),
    path('subir-archivo/', views.subir_archivo, name='subir-archivo'),
    path('obtener_datos/', views.obtener_datos_view, name='obtener_datos'),

]
