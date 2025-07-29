from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.GameListViewSet.as_view(), name='api-game-list'),
    path('game//<int:pk>/', views.GameDetailViewSet.as_view(), name='api-game-detail'),
    path('gamesystems/', views.GamesystemListViewSet.as_view(), name='api-gamesystems-list'),

    # path('game/add', views.create_game),
    # path('gamesystems/', views.get_all_gamesystems, name='api-gamesystems-list'),
    # path('gamesystem/add', views.create_gamesystem),
]
