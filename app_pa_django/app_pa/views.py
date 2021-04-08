from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
# Create your views here.

class LugarViewSet(viewsets.ModelViewSet):
    queryset = Lugar.objects.all()
    serializer_class = LugarSerializer

class FavoritoViewSet(viewsets.ModelViewSet):
    queryset = Favorito.objects.all() #TODO: mostrar solo los de este usuario
    serializer_class = FavoritoSerializer


