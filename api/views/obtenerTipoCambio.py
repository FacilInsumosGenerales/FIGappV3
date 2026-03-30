from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.tipoCambioService import obtenerTipoCambio


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class ObtenerTipoCambioView(View):
    def get(self, request, *args, **kwargs):
        resultados = obtenerTipoCambio()
        return enviar_respuesta(data=resultados, message="Informacion obtenida con exito")

