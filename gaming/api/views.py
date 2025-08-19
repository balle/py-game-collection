from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import generics
from gaming.models import Game, Gamesystem, Genre
from .serializers import GameSerializer, GamesystemSerializer, GenreSerializer


class GameListView(generics.ListAPIView):
    #queryset = Game.objects.all().order_by('name')
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all()

        genre = self.request.query_params.get('genre')
        gamesystem = self.request.query_params.get('gamesystem')
        played = self.request.query_params.get('played')
        finished = self.request.query_params.get('finished')

        if genre:
            try:
                queryset = queryset.filter(genre__id=int(genre))
            except ValueError:
                pass

        if gamesystem:
            try:
                queryset = queryset.filter(gamesystems__id=int(gamesystem))
            except ValueError:
                pass

        if played:
            try:
                queryset = queryset.filter(played=bool(played))
            except ValueError:
                pass

        if finished:
            try:
                queryset = queryset.filter(finished=bool(finished))
            except ValueError:
                pass

        return queryset

class GameDetailView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

# @api_view(['GET'])
# def get_all_games(request):
#     games = Game.objects.all()

#     try:
#         games.filter(genre=int(request.GET['genre']))
#     except (KeyError, ValueError):
#         pass

#     try:
#         games.filter(gamesystem=int(request.GET['gamesystem']))
#     except (KeyError, ValueError):
#         pass

#     return Response(GameSerializer(games, many=True).data)

@api_view(['POST'])
def create_game(request):
    serializer = GameSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

class GamesystemListView(generics.ListAPIView):
    queryset = Gamesystem.objects.all().order_by('name')
    serializer_class = GamesystemSerializer

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer


# @api_view(['GET'])
# def get_all_gamesystems(request):
#     gamesystems = Gamesystem.objects.all()
#     return Response(GamesystemSerializer(gamesystems, many=True).data)

@api_view(['POST'])
def create_gamesystem(request):
    serializer = GamesystemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)