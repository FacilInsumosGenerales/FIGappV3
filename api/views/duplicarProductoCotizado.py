from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.productosOfrecidosService import duplicarProductoOfrecido


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class DuplicarProductoCotizadoView(View):
    def post(self, request, *args, **kwargs):
        traza = request.POST.get('producto')
        duplicarProductoOfrecido(traza)
        return enviar_respuesta(message="Se elimino correctamente")
    
    