from django.contrib import admin
from .models import Gamesystem, Game

class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'played', 'finished', 'pub_date')
    list_filter = ['gamesystems', 'played', 'finished']

admin.site.register(Gamesystem)
admin.site.register(Game, GameAdmin)
