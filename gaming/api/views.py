from rest_framework.response import Response 
from rest_framework.decorators import api_view
from gaming.models import Game, Gamesystem
from .serializers import GameSerializer, GamesystemSerializer

@api_view(['GET'])
def get_all_games(request):
    games = Game.objects.all()
    return Response(GameSerializer(games, many=True).data)

@api_view(['POST'])
def create_game(request):
    serializer = GameSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def get_all_gamesystems(request):
    gamesystems = Gamesystem.objects.all()
    return Response(GamesystemSerializer(gamesystems, many=True).data)

@api_view(['POST'])
def create_gamesystem(request):
    serializer = GamesystemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)