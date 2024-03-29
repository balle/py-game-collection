# Generated by Django 4.1.2 on 2023-02-25 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gaming', '0004_rename_download_game_download_only'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='description',
            field=models.TextField(blank=True, max_length=2048),
        ),
        migrations.AlterField(
            model_name='game',
            name='genre',
            field=models.ManyToManyField(blank=True, to='gaming.genre'),
        ),
    ]
