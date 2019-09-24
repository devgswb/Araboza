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
    sa = analysis.SentiAnalysis()
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request):
        dirname = os.path.dirname(os.path.dirname(__file__)).replace('\\', '/')
        with open(f'{dirname}/server_settings.json', encoding='utf-8') as data_file:
            data = json.load(data_file)
            start_date = data['search_start_date']
            end_date = data['search_end_date']
        search_word = request.query_params['word']
        try:
            site_code = int(request.query_params['sitecode'])
        except:
            site_code = False
        if site_code:
            data = self.sa.result_from_db(start_date, end_date, site_code, search_word=search_word)
            return Response(data)
        else:
            data_list = []
            for site_code in range(1, 16):
                # site_code 7번 정지
                if site_code != 7:
                    data = self.sa.result_from_db(start_date, end_date, site_code, search_word=search_word)
                    data_list.append(data)
            return Response(data_list)

class HotWordAPIView(views.APIView):
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request):
        day = int(request.query_params['day'])
        dirname = os.path.dirname(os.path.dirname(__file__)).replace('\\', '/') + '/hotword'
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
