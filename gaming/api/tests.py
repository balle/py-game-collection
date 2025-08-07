import json
from random import random
from datetime import datetime
from django.urls import reverse
from rest_framework.test import APITestCase
from gaming.models import Game, Gamesystem

class GamingTests(APITestCase):
    fixtures = ['testdata.json'] 

    def test_get_games(self):
        response = self.client.get(reverse('api-game-list'))
        self.assertEqual(response.status_code, 200)

        games = json.loads(response.content)
        self.assertTrue(len(games['results']) <= 100)
        self.assertTrue(games['results'][0]['name'] != "")
        self.assertTrue(type(games['results'][0]['tag']) == list)

    def test_filter_games(self):
        response = self.client.get(reverse('api-game-list'), args={'genre': '34'})
        self.assertEqual(response.status_code, 200)

        games = json.loads(response.content)
        self.assertFalse(list(filter(lambda x: x['genre'] != '34', games['results'])))

        response = self.client.get(reverse('api-game-list'), args={'gamesystem': '1'})
        self.assertEqual(response.status_code, 200)

        games = json.loads(response.content)
        self.assertFalse(list(filter(lambda x: x['gamesystem'] != '1', games['results'])))


    def test_get_game_details(self):
        response = self.client.get(reverse('api-game-detail', args=(5,)))
        self.assertEqual(response.status_code, 200)

        games = json.loads(response.content)
        self.assertEqual(games['name'], "Gran Turismo 7")

    def test_get_gamesystems(self):
        response = self.client.get(reverse('api-gamesystem-list'))
        self.assertEqual(response.status_code, 200)

        gamesystems = json.loads(response.content)
        self.assertTrue(len(gamesystems) > 0)
        self.assertTrue(gamesystems['results'][0]['name'] != "")

    def test_get_genres(self):
        response = self.client.get(reverse('api-genre-list'))
        self.assertEqual(response.status_code, 200)

        genres = json.loads(response.content)
        self.assertTrue(len(genres) > 0)
        self.assertTrue(genres['results'][0]['name'] != "")
