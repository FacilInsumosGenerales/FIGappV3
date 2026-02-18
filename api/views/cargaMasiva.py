from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.fileService import obtenerFilasDeExcel
from ..services.insertService import guardarDatosNuevos
import json


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class CargaMasivaView(View):
    
    def post(self, request, *args, **kwargs):
        archivo = request.FILES.get("archivo")

        tabla = request.POST.get("tabla")
        extra_columns = request.POST.get("extraColumns")
        ignorar_columns = request.POST.get("ignorarColumns")

        if extra_columns:
            extra_columns = json.loads(extra_columns)

        if ignorar_columns:
            ignorar_columns = json.loads(ignorar_columns)

        data = obtenerFilasDeExcel(archivo, ignorar_columns, extra_columns) # solo para xlsx

        resultados = guardarDatosNuevos(tabla, data)

        return enviar_respuesta(message="Carga masiva completada",data=resultados)

