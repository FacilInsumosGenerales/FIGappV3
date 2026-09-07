from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.movimientosLogisticosService import asociarMovConFacturasLogisticas


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class RelacionarMovFacturaLogView(View):
    def post(self, request, *args, **kwargs):
        trazaFactura = request.POST.get('trazaFactura')
        trazasMov = request.POST.getlist('trazasMov') # ['667,668,669,670,671,672,673,674']

        trazasMov = [
            int(pk.strip())
            for pk in trazasMov[0].split(',')
            if pk.strip()
        ]

        asociarMovConFacturasLogisticas(trazaFactura,trazasMov)
        
        return enviar_respuesta(message="Se ejecuta correctamente")
    
    