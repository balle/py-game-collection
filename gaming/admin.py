from django.contrib import admin
from .models import Gamesystem, Game

class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'played', 'finished', 'created_date', 'started_date', 'finished_date')
    list_filter = ['gamesystems', 'played', 'finished','download']

admin.site.register(Gamesystem)
admin.site.register(Game, GameAdmin)
