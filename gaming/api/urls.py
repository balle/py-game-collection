from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.GameListView.as_view(), name='api-game-list'),
    path('game//<int:pk>/', views.GameDetailView.as_view(), name='api-game-detail'),
    path('gamesystems/', views.GamesystemListView.as_view(), name='api-gamesystem-list'),
    path('genres/', views.GenreListView.as_view(), name='api-genre-list'),

    # path('game/add', views.create_game),
    # path('gamesystems/', views.get_all_gamesystems, name='api-gamesystems-list'),
    # path('gamesystem/add', views.create_gamesystem),
]
