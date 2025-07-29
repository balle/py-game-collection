from ast import Delete
from django.test import TestCase
from django.test import Client
from django.urls import reverse
from .models import Game, Gamesystem, Genre

class GamingTests(TestCase):
    fixtures = ['testdata.json'] 

    def test_game_details(self):
        url = reverse('detail', args=(2,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Crash Bandicoot")

    def test_games_unplayed(self):        
        response = self.client.get(reverse('games_unplayed'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Aliens Fireteam Elite")

    def test_gamesystems(self):        
        response = self.client.get(reverse('gamesystems'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "SNES")

    def test_gamesystem_details(self):
        url = reverse('gamesystem_detail', args=(13,))
        response = self.client.get(url)
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Game Boy")

    def test_gaming_search(self):
        response = self.client.post(reverse('search'), data={"search_string": "Crash"})
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "Crash Bandicoot")

