from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..services.fileService import procesarSubidaArchivo
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class SubirArchivoView(View):
    
    def post(self, request, *args, **kwargs):
        print(1)
        archivo = request.FILES.get("archivo")
        resultado = procesarSubidaArchivo(archivo)
        return enviar_respuesta(message="Archivo subido correctamente",data=resultado)

