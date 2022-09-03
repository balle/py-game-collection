from django.db import models
from django.utils import timezone

class Gamesystem(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=200)
    gamesystems = models.ManyToManyField(Gamesystem)
    pub_date = models.DateTimeField('date published', default=timezone.now())
    played = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return self.name
