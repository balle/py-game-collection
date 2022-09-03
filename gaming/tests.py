from ast import Delete
from django.test import TestCase
from django.test import Client
from django.urls import reverse
from .models import Game, Gamesystem

class GamingTests(TestCase):
    def setUp(self):
        self.gamesystem = Gamesystem.objects.create(name="Test Gamesystem")
        self.game = Game.objects.create(name="Test Game")
        self.game.gamesystems.add(self.gamesystem)
        self.game.save()
        
    def test_gaming_index(self):        
        response = self.client.get(reverse('index'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

    def test_game_details(self):
        url = reverse('detail', args=(self.game.id,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Played")

    def test_gamesystem_details(self):
        url = reverse('gamesystem', args=(self.gamesystem.id,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

    def test_gaming_search(self):
        response = self.client.post(reverse('search'), data={"search_string": "test"})
        self.assertIs(response.status_code, 200)
        self.assertContains(response, self.game.name)

