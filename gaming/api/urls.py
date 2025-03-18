from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.get_all_games),
    path('game/add', views.create_game),
    path('gamesystems/', views.get_all_gamesystems),
    path('gamesystem/add', views.create_gamesystem),
]
