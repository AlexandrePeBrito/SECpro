# Generated by Django 3.2.11 on 2022-07-20 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemaSec_sede', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sede',
            name='telefone_sede',
            field=models.CharField(max_length=15),
        ),
    ]
