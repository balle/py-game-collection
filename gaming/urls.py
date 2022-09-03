from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('game/<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('gamesystem/<int:gamesystem_id>/', views.gamesystem, name='gamesystem'),
    path('game/search', views.search, name='search'),
]
