import json
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.pdfServices import generarPdfCotizacion


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class GenerarPdfView(View):
    
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        url = generarPdfCotizacion(data)

        return enviar_respuesta(message="PDF Generado y guardado en el sistema",data=url)
    