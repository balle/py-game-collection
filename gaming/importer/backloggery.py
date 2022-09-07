#!/usr/bin/python

###[ Loading modules

import os
import sys
import django
import requests 
from bs4 import BeautifulSoup

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'py_game_collection.settings')
django.setup()

from gaming.models import Gamesystem, Game


###[ Subroutines 

def get_url(url):
    """
    Get the url and return requests.Response object
    """
    response = None

    try:
        response = requests.get(url)
    except requests.exceptions.ConnectionError as e:
        print("Cannot connect to url %s: %s" % (url, e))

    if response.status_code != 200:
        response = None 
        print("Request to %s failed with %d" % (url, response.status_code))

    return response


def get_all_gamesystems(base_url, user):
    """
    Parse all gamesystems from backloggery
    Returns a dict with gamesystem name as key and detail url as value
    """
    result = {}
    response = get_url(base_url + user)

    if response:
        soup = BeautifulSoup(response.content, features="html.parser")

        for gamesystem in soup.findAll('a', attrs={'class': 'sysbox'}):
            if gamesystem.text != "All Games":
                result[gamesystem.text] = base_url + gamesystem.get('href').replace("games.php", "ajax_moregames.php")

    return result


def create_gamesystems(gamesystems):
    """
    Check if gamesystem with same name already exists in the db
    Otherwise create it
    """
    for gamesystem in gamesystems:
        does_not_exists = False

        try:
            Gamesystem.objects.get(name=gamesystem)
            print("Gamesystem %s already exists" % (gamesystem,))
        except Gamesystem.DoesNotExist:
            does_not_exists = True

        if does_not_exists:
            print("Creating gamesystem " + gamesystem)
            Gamesystem.objects.create(name=gamesystem)


def get_all_games(base_url):
    """
    Parse all games from backloggery
    Returns a dict with game name as key and status as value
    """
    result = {}
    response = get_url(base_url)

    if response:
        soup = BeautifulSoup(response.content, features="html.parser")

        for section in soup.findAll('section', attrs={'class': 'gamebox'}):
            if section.find('b'):
                game_name = section.find('b').text
                img = section.find('img')

                if img and img.get('src'):
                    game_status = None

                    if "unplayed" in img.get('src'):
                        game_status = "unplayed"
                    elif "unfinished" in img.get('src'):
                        game_status = "unfinished"
                    elif "beaten" in img.get('src'):
                        game_status = "beaten"

                    print("%s %s" % (game_name, game_status))
                    result[game_name] = game_status

    return result

def create_game(game_name, gamesystem):
    """
    Check if game with same name already exists in the db
    And if it has the given gamesystem set
    Otherwise create it   
    """
    game = None

    try:
        game = Game.objects.get(name=game_name)
        print("Game %s already exists" % (game_name,))
    except Game.DoesNotExist:
        pass

    if not game:
        print("Creating game " + game_name)
        game = Game.objects.create(name=game_name)

    if not gamesystem in game.gamesystems.all():
        game.gamesystems.add(Gamesystem.objects.get(name=gamesystem))

    game.save()


###[ MAIN PART

if len(sys.argv) < 2:
    print(sys.argv[0] + " <username>")
    sys.exit(1)

base_url = "https://www.backloggery.com/"

gamesystems = get_all_gamesystems(base_url, sys.argv[1])

if not gamesystems or len(gamesystems) == 0:
    print("Failed to get gamesystems")
    sys.exit(0)

create_gamesystems(gamesystems)
print("MUH " + str(gamesystems))

for gamesystem, url in gamesystems.items():
    games = get_all_games(url)

    for game in games:
        create_game(game, gamesystem)
