# Generated by Django 2.2.1 on 2019-07-15 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Impression',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('positive', models.FloatField(default=0.0)),
                ('negative', models.FloatField(default=0.0)),
            ],
        ),
    ]