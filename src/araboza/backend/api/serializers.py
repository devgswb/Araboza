from rest_framework_mongoengine import serializers
from .models import Tool


class ToolSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Tool
        fields = '__all__'