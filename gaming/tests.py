from ast import Delete
from django.test import TestCase
from django.test import Client
from django.urls import reverse
from .models import Game, Gamesystem, Genre

class GamingTests(TestCase):
    def setUp(self):
        self.gamesystem = Gamesystem.objects.create(name="Test Gamesystem")
        self.genre = Genre.objects.create(name="Ego-Shooter")
        self.game = Game.objects.create(name="Doom", played=True, finished=False)
        self.game.gamesystems.add(self.gamesystem)
        self.game.save()

    def test_game_description(self):
        self.assertEquals(self.game.description, "")
        self.game.fetch_description()
        self.assertContains(self.game.description,"id Software")

    def test_game_genre(self):
        self.assertEquals(self.game.genre.count(), 0)
        self.game.fetch_genre()
        self.assertEquals(self.game.genre.count(), 1)        
        self.assertIn(self.genre, self.game.genre)

    def test_gaming_index(self):        
        response = self.client.get(reverse('index'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

    def test_game_details(self):
        url = reverse('detail', args=(self.game.id,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Played")

    def test_games_unplayed(self):        
        response = self.client.get(reverse('games_unplayed'))
        self.assertIs(response.status_code, 200)
        self.assertNotContains(response, self.game.name)

    def test_games_unfinished(self):        
        response = self.client.get(reverse('games_unfinished'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

    def test_gamesystems(self):        
        response = self.client.get(reverse('gamesystems'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.gamesystem.name)

    def test_gamesystem_details(self):
        url = reverse('gamesystem_detail', args=(self.gamesystem.id,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

    def test_gaming_search(self):
        response = self.client.post(reverse('search'), data={"search_string": "test"})
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

