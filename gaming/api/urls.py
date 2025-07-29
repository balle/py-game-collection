from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.GameViewSet.as_view({'get': 'list'}), name='api-games'),
    # path('game/add', views.create_game),
    path('gamesystems/', views.get_all_gamesystems, name='api-gamesystems'),
    # path('gamesystem/add', views.create_gamesystem),
]
