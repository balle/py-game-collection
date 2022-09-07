from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('game/<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('games/unplayed', views.games_unplayed, name='games_unplayed'),
    path('games/unfinished', views.games_unfinished, name='games_unfinished'),
    path('gamesystems/', views.gamesystems, name='gamesystems'),
    path('gamesystem/<int:gamesystem_id>/', views.gamesystem_detail, name='gamesystem_detail'),
    path('games/search', views.search, name='search'),
]
