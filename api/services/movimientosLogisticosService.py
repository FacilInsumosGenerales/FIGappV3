from ..models import MovimientosLogisticos
from datetime import date

def asociarMovConFacturasLogisticas(trazaFactura,trazasMov):

    MovimientosLogisticos.objects.filter(
        pk__in=trazasMov
    ).update(
        movimientoBancario_id=trazaFactura
    )
    