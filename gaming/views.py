from http.client import HTTPResponse
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.views import generic

from .models import Game, Gamesystem

def index(request):
    return list_view(request)

def list_view(request, games=None):
    if games == None:
        games = Game.objects.all().order_by('name')

    return render(request, 'game/list.html', { 'games': games })

def games_unplayed(request):
    games = [] 
    
    try:
        games = Game.objects.filter(played=False).order_by('name')
    except (KeyError, Game.DoesNotExist):
        pass

    return list_view(request, games)    

def games_unfinished(request):
    games = [] 
    
    try:
        games = Game.objects.filter(finished=False).order_by('name')
    except (KeyError, Game.DoesNotExist):
        pass

    return list_view(request, games)    

def search(request):
    games = [] 
    
    try:
        games = Game.objects.filter(name__contains=request.POST['search_string']).order_by('name')
    except (KeyError, Game.DoesNotExist):
        pass

    return list_view(request, games)

class DetailView(generic.DetailView):
    model = Game
    template_name = 'game/detail.html'

def gamesystems(request):
    gamesystems = Gamesystem.objects.all().order_by('name')
    no_of_games = {}

    for gamesystem in gamesystems:
        no_of_games[gamesystem.id] = gamesystem.game_set.all().count()

    return render(request, 'gamesystem/list.html', { 'gamesystems': gamesystems,
                                                      'no_of_games': no_of_games })

def gamesystem_detail(request, gamesystem_id):
    gamesystem = get_object_or_404(Gamesystem, pk=gamesystem_id)
    return render(request, 'gamesystem/detail.html', { 'gamesystem': gamesystem,
                                                       'games': gamesystem.game_set.all().order_by('name')})
