from django.urls import  path
from . import views

urlpatterns = [
    path("", views.home, name='home'),
    path("AnadirRequerimientos/", views.anadirReqs, name='AnadirReqs')
]