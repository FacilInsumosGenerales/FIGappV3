from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..services.fileService import procesarSubidaArchivo

@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class SubirArchivoView(View):
    
    def post(self, request, *args, **kwargs):
        print(1)
        archivo = request.FILES.get("archivo")
        print(archivo)
        if archivo is None:
            return JsonResponse({"error": "No se recibió ningún archivo"}, status=400)
        print("entrando a procesar archivo")
        resultado = procesarSubidaArchivo(archivo)

        return JsonResponse({
            "message": "Archivo subido correctamente",
            "archivo": resultado
        })
