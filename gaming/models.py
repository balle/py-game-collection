from django.db import models

import wikipedia
from bs4 import BeautifulSoup
class Gamesystem(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
class Game(models.Model):
    name = models.CharField(max_length=200)
    gamesystems = models.ManyToManyField(Gamesystem)
    created_date = models.DateTimeField('date created', auto_now_add=True)
    started_date = models.DateTimeField('date started', null=True, blank=True)
    finished_date = models.DateTimeField('date finished', null=True, blank=True)
    played = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    download_only = models.BooleanField(default=False)
    genre = models.ManyToManyField(Genre, blank=True)
    description = models.TextField(max_length=2048, blank=True)

    def _get_page(self):
        """
        Search for the game on wikipedia
        Returns wikipedia.WikipediaPage or None
        """
        page = None

        try:
            page = wikipedia.page(self.name + " game")
        except (wikipedia.exceptions.PageError, wikipedia.exceptions.DisambiguationError):
            pass

        return page

    def parse_description(self, page):
        """
        Parse game description from wikipedia page and save it in the model
        """
        if page:
            self.description = page.summary

    def parse_genre(self, page):
        """
        Parse genres from wikipedia page and save it in the model
        Create a Genre model object if Genry does not exist
        """
        if not page:
            return
        
        soup = BeautifulSoup(page.html(), features="html.parser")

        for table in soup.find_all("table", attrs={"class": "infobox"}):
            for row in table.find_all("tr"):
                if row.th and row.th.a and row.th.a.text and "genre" in row.th.a.text.lower():
                    genre = None

                    try:
                        genre = Genre.objects.get(name=row.th.a.text)
                    except Genre.DoesNotExist or NoneType:
                        genre = Genre.objects.create(name=row.th.a.text)

                    self.genre.add(genre)

    # Overwrite save method to fetch genre and description if unset
    def save(self, *args, **kwargs):
        if self.pk:
            page = None

            if self.description == "":
                page = self._get_page()
                self.parse_description(page)

            if len(self.genre.all()) == 0:
                if not page:
                    page = self._get_page()

                self.parse_genre(page)

        return super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
