from mongoengine import Document, EmbeddedDocument, fields


class ToolInput(EmbeddedDocument):
    name = fields.StringField(required=True)
    value = fields.DynamicField(required=True)


class Tool(Document):
    label = fields.StringField(required=True)
    description = fields.StringField(required=True, null=True)
    inputs = fields.ListField(fields.EmbeddedDocumentField(ToolInput))

class Impression(Document):
    positive = fields.FloatField(required=True, default=0.0)
    negative = fields.FloatField(required=True, default=0.0)

class Index(Document):
    rang = fields.DynamicField(required=True, default=0)
    word = fields.StringField(required=True, null=True)
    plus = fields.StringField(required=True, null=True)

class Search(Document):
    site_code = fields.IntField(required=True)
    search_word = fields.StringField(required=True)
    related_word = fields.ListField(fields=fields.ListField())
    total_sentence_count = fields.IntField(required=True)
    positive = fields.FloatField(required=True, default=0.0)
    negative = fields.FloatField(required=True, default=0.0)
