from django.core.management.base import BaseCommand
from ...services.tipoCambioService import actualizarTipoCambio

class Command(BaseCommand):

    help = "Actualiza el tipo de cambio desde SUNAT"

    def handle(self, *args, **kwargs):

        resultado = actualizarTipoCambio()

        self.stdout.write(
            self.style.SUCCESS(f"Tipo de cambio actualizado: {resultado}")
        )
