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

def get_all_gamesystems(base_url):
    """
    Parse all gamesystems from backloggery
    Returns a dict with gamesystem name as key and detail url as value
    """
    response = None
    result = {}

    try:
        response = requests.get(base_url)
    except requests.exceptions.ConnectionError as e:
        print("Cannot connect to url %s: %s" % (base_url, e))

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, features="html.parser")

        for gamesystem in soup.findAll('a', attrs={'class': 'sysbox'}):
            if gamesystem.text != "All Games":
                result[gamesystem.text] = gamesystem.get('href')

    else:
        print("Request to %s failed with %d" % (base_url, response.status_code))

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


###[ MAIN PART

if len(sys.argv) < 2:
    print(sys.argv[0] + " <username>")
    sys.exit(1)

base_url = "https://www.backloggery.com/" + sys.argv[1]

gamesystems = get_all_gamesystems(base_url)

if not gamesystems or len(gamesystems) == 0:
    print("Failed to get gamesystems")
    sys.exit(0)

create_gamesystems(gamesystems)
