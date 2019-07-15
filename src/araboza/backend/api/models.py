from django.db import models


class Impression(models.Model):
    positive = models.FloatField(default=0.0)
    negative = models.FloatField(default=0.0)
# Create your models here.
