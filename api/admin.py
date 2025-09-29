from django.contrib import admin
from django.apps import apps
from .apps import ApiConfig

# obtiene todos los modelos de la app actual
app = apps.get_app_config(ApiConfig.name)
for model_name, model in app.models.items():
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass


