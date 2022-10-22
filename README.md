# py-game-collection
Python / Django app to manage my videogame collection.

## Installation

```
pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

The normal webpage is at http://127.0.0.1:8000/ and admin interface on http://127.0.0.1:8000/admin

Or deploy it on the WSGI server of your choice.

## Using Docker

```
docker build -t py-game-collection .
docker run --name my-game-collection -p 8000:8000 -d py-game-collection
docker exec -it my-game-collection python manage.py createsuperuser
```

## Import data

There is an import script for users of backloggery.com

```
python3 gaming/importer/backloggery.py <username>
```

## Credits

Icons from freeicons.io
