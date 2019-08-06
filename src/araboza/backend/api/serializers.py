from rest_framework_mongoengine import serializers
from . import models


class ToolSerializer(serializers.DocumentSerializer):
    class Meta:
        model = models.Tool
        fields = '__all__'

class ImpressionSerializer(serializers.DocumentSerializer):
    class Meta:
        model = models.Impression
        fields = '__all__'

class IndexSerializer(serializers.DocumentSerializer):
    class Meta:
        model = models.Index
        fields = '__all__'