from django.contrib import admin
from .models import Gamesystem, Game, Genre, Tag

class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'played', 'finished', 'created_date', 'started_date', 'finished_date')
    list_filter = ['gamesystems', 'tag', 'genre', 'played', 'finished', 'download_only']
    search_fields = ['name__icontains']

admin.site.register(Gamesystem)
admin.site.register(Genre)
admin.site.register(Tag)
admin.site.register(Game, GameAdmin)
