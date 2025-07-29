import json
from random import random
from datetime import datetime
from django.urls import reverse
from rest_framework.test import APITestCase
from gaming.models import Game, Gamesystem

class GamingTests(APITestCase):
    fixtures = ['testdata.json'] 

    def test_get_games(self):
        response = self.client.get(reverse('api-games'))
        self.assertEqual(response.status_code, 200)

        games = json.loads(response.content)
        print(games)
        self.assertEqual(len(games['results']), 15)

    def test_get_gamesystems(self):
        response = self.client.get(reverse('api-gamesystems'))
        self.assertEqual(response.status_code, 200)

        gamesystems = json.loads(response.content)
        self.assertTrue(len(gamesystems) > 0)
