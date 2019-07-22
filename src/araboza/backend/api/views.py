from django.shortcuts import render

from rest_framework_mongoengine import viewsets as meviewsets
from . import serializers
from . import models


class ToolViewSet(meviewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Tool.objects.all()
    serializer_class = serializers.ToolSerializer

class ImpressionViewSet(meviewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Impression.objects.all()
    serializer_class = serializers.ImpressionSerializer
