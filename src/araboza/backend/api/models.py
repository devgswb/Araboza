from mongoengine import Document, EmbeddedDocument, fields

class Impression(Document):
    positive = fields.FloatField(default=0.0)
    negative = fields.FloatField(default=0.0)
# Create your models here.
