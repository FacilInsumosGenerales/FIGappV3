from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.tipoCambioService import actualizarTipoCambio


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class TipoCambioView(View):
    
    def get(self, request, *args, **kwargs):
        resultado = actualizarTipoCambio()
        return enviar_respuesta(data=resultado, message="Se guardo con exito el tipo de cambio!")
    