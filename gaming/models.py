from django.db import models

class Gamesystem(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=200)
    gamesystems = models.ManyToManyField(Gamesystem)
    created_date = models.DateTimeField('date created', auto_now_add=True)
    started_date = models.DateTimeField('date started', null=True, blank=True)
    finished_date = models.DateTimeField('date finished', null=True, blank=True)
    played = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    download = models.BooleanField(default=False)

    def __str__(self):
        return self.name
