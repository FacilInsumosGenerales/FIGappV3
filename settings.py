import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('MYSQL_DATABASE', 'facilins_AppV3_produccion'),
        'USER': os.getenv('MYSQL_USER', 'user_produccion'),
        'PASSWORD': os.getenv('MYSQL_PASSWORD', 'C6!~g(nAk?qR'),
        'HOST': os.getenv('MYSQL_HOST', 'db'),
        'PORT': os.getenv('MYSQL_PORT', '3306'),
    }
}
