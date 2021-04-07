from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Lugar, Favorito


class LugarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lugar
        fields = ['id', 'nombre', 'texto', 'imagen']

class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = ['lugar', 'de_quien']


