from rest_framework import serializers
from gaming.models import Game, Gamesystem, Genre

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
        
class GamesystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gamesystem
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
