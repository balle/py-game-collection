#!/usr/bin/python

# [ Loading modules

import re
import os
import sys
import django
import requests
from bs4 import BeautifulSoup

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'py_game_collection.settings')
django.setup()
from gaming.models import Gamesystem, Game


# [ Subroutines


def get_url(my_url: str):
    """
    Get the url and return requests.Response object
    """
    response = None

    try:
        print(f'Fetching url {my_url}')
        response = requests.get(my_url, timeout=10)
    except requests.exceptions.ConnectionError as error:
        print(f'Cannot connect to url {my_url}: {error}')

    if response and response.status_code != 200:
        print(f'Request to {my_url} failed with {response.status_code}')
        response = None

    return response


def get_all_gamesystems(my_url: str, user: str):
    """
    Parse all gamesystems from backloggery
    Returns a dict with gamesystem name as key and detail url as value
    """
    result: dict[str, str] = {}
    response = get_url(my_url + user)

    if response:
        soup = BeautifulSoup(response.content, features="html.parser")

        for game_system in soup.findAll('a', attrs={'class': 'sysbox'}):
            if game_system.text != "All Games":
                result[game_system.text] = my_url + \
                    game_system.get('href').replace(
                        "games.php", "ajax_moregames.php")

    return result


def create_gamesystems(game_systems: dict):
    """
    Check if gamesystem with same name already exists in the db
    Otherwise create it
    """
    for game_system in game_systems:
        does_not_exists = False

        try:
            Gamesystem.objects.get(name=game_system)
            print(f'Gamesystem {game_system} already exists')
        except Gamesystem.DoesNotExist:
            does_not_exists = True

        if does_not_exists:
            print(f'Creating gamesystem {game_system}')
            Gamesystem.objects.create(name=game_system)


def get_all_games(my_url: str, memorycard={}):
    """
    Parse all games from backloggery, merge the parsed data with the optional memorycard data
    Returns a dict with game name as key and another dict with keys like 
    status, started- / finished date download as value
    """
    result: dict[str, dict] = {}
    response = get_url(my_url)

    if response:
        soup = BeautifulSoup(response.content, features="html.parser")

        for section in soup.findAll('section', attrs={'class': 'gamebox'}):
            if section.find('b'):
                game_name: str = str(section.find('b').text)
                result[game_name] = {}

                img = section.find('img')

                if img and img.get('src'):
                    game_status = None

                    if "unplayed" in img.get('src'):
                        game_status = "unplayed"
                    elif "unfinished" in img.get('src'):
                        game_status = "unfinished"
                    elif "beaten" in img.get('src'):
                        game_status = "beaten"
                    elif "completed" in img.get('src'):
                        game_status = "completed"

                    print(f'{game_name} {game_status}')
                    result[game_name]['status'] = game_status

                if section.find('div', attrs={'class': 'gamerow'}).find('img'):
                    gamerow = section.find(
                        'section', attrs={'class': 'gamerow'})

                    if gamerow:
                        img = gamerow.find('img')

                        if img and img.get('src') and "other" in img.get('src'):
                            result[game_name]['download_only'] = True

                if memorycard.get(game_name):
                    for game_data, game_value in memorycard[game_name].items():
                        result[game_name][game_data] = game_value

    return result


def create_game(game_name: str, game_data: dict, gamesystem: str):
    """
    Check if game with same name already exists in the db
    And if it has the given gamesystem set
    Otherwise create it   
    """
    game = None

    try:
        game = Game.objects.get(name=game_name)
        print(f'Game {game_name} already exists. Updating data.')
    except Game.DoesNotExist:
        pass

    if not game:
        print("Creating game " + game_name)
        game = Game.objects.create(name=game_name)

    if gamesystem not in game.gamesystems.all():
        game.gamesystems.add(Gamesystem.objects.get(name=gamesystem))

    if game_data['status'] == "unplayed":
        game.finished = False
        game.played = False
    elif game_data['status'] == "unfinished":
        game.finished = False
        game.played = True
    elif game_data['status'] == "beaten" or game_data['status'] == "completed":
        game.finished = True
        game.played = True

    if game_data.get('download'):
        game.download_only = True

    if not game_data.get('created_date') and game_data.get('started_date'):
        game_data['created_date'] = game_data['started_date']

    if not game_data.get('created_date') and game_data.get('finished_date'):
        game_data['created_date'] = game_data['finished_date']

    for key in ['created_date', 'started_date', 'finished_date']:
        if game_data.get(key):
            # month-day-year
            date = game_data[key].split('-')
            setattr(game, key, f'20{date[2]}-{date[0]}-{date[1]} 00:00')

    game.save()


def read_memorycard(base_url: str, user: str):
    """
    Read memorycard page of user to parse when a game entered the collection,
    when one started playing it or beated it
    Returns dict with game name as key and dict as value with the parsed data
    """
    result: dict[str, str] = {}
    response = get_url(base_url + user)

    if response:
        soup = BeautifulSoup(response.content, features="html.parser")
        game_date = None

        # \n09-02-22 New: Road Redemption \xa0(Switch)
        # New: Parasite Eve 2  (PS)
        memorycard_entry = re.compile(r'(?P<date>\d\d\-\d\d\-\d\d)?\s?(?P<status>.+?): (?P<name>.+) \(.+\)',
                                      re.MULTILINE)

        for label in soup.findAll('label'):
            match = memorycard_entry.match(
                label.text.replace('\n', '').replace('\xa0', ''))

            if match:
                result[match.group('name')] = {}

                if match.group('date'):
                    game_date = match.group('date')

                if "New" in match.group('status'):
                    result[match.group('name')]['created_date'] = game_date
                elif 'Started' in match.group('status'):
                    result[match.group('name')]['started_date'] = game_date
                elif 'Beat' in match.group('status'):
                    result[match.group('name')]['finished_date'] = game_date

    return result


# [ MAIN PART

if len(sys.argv) < 2:
    print(sys.argv[0] + " <username>")
    sys.exit(1)

BASE_URL = "https://www.backloggery.com/"
MEMORYCARD_URL = "https://backloggery.com/memorycard.php?user="

gamesystems = get_all_gamesystems(BASE_URL, sys.argv[1])

if not gamesystems or len(gamesystems) == 0:
    print("Failed to get gamesystems")
    sys.exit(0)

create_gamesystems(gamesystems)

memorycard = read_memorycard(MEMORYCARD_URL, "balle")

for gamesystem, url in gamesystems.items():
    games = get_all_games(url, memorycard)

    for game_name, game_data in games.items():
        create_game(game_name, game_data, gamesystem)
