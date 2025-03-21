# Generated by Django 2.2.26 on 2022-09-14 13:28

import datetime
from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('gaming', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='description',
            field=models.TextField(default='', max_length=2048),
        ),
        migrations.AlterField(
            model_name='game',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 9, 14, 13, 28, 50, 346965, tzinfo=datetime.timezone.utc), verbose_name='date created'),
        ),
        migrations.AddField(
            model_name='game',
            name='genre',
            field=models.ManyToManyField(to='gaming.Genre'),
        ),
    ]
