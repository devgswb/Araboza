from .models import Impression
from rest_framework import serializers, viewsets


class ImpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impression
        fields = '__all__'


class ImpressionViewSet(viewsets.ModelViewSet):
    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer