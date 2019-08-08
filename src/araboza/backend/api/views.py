from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework_mongoengine import viewsets as meviewsets
from rest_framework.decorators import api_view
from rest_framework.viewsets import views
from rest_framework.response import Response
from . import serializers
from . import models
import sys
import json
import os
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
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request):
        search_word = request.query_params['word']
        sa = analysis.SentiAnalysis()
        data = sa.result_from_db('2019-07-06', '2019-08-06', 13, search_word=search_word)

        return Response(data)

class HotWordAPIView(views.APIView):
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request):
        day = int(request.query_params['day'])
        dirname = os.path.dirname(__file__).split('\\api')[0] + '/hotword'
        dirname = dirname.replace("\\", "/")
        name = ''
        if day == 0:
            name = 'yesterday'
        elif day == 1:
            name = '2_days_ago'
        elif day == 2:
            name = '3_days_ago'

        with open(f'{dirname}/{name}.json', 'r', encoding='UTF8') as json_file:
            data = json.load(json_file)

        return Response(data)
