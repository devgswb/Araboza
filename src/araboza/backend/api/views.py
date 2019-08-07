from django.shortcuts import render
from rest_framework_mongoengine import viewsets as meviewsets
from rest_framework.decorators import api_view
from rest_framework.viewsets import views
from rest_framework.response import Response
from . import serializers
from . import models
import sys
sys.path.append("..")
from modules.senti_analysis import analysis

class ToolViewSet(meviewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Tool.objects.all()
    serializer_class = serializers.ToolSerializer

class ImpressionViewSet(meviewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Impression.objects.all()
    serializer_class = serializers.ImpressionSerializer

class IndexViewSet(meviewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Index.objects.all()
    serializer_class = serializers.IndexSerializer


class SearchAPIView(views.APIView):
    def get(self, request):
        search_word = request.query_params['word']
        sa = analysis.SentiAnalysis()
        data = sa.result_from_db('2019-07-06', '2019-08-06', 13, search_word=search_word)
        return Response(data)
