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
    genre = models.ManyToManyField(Genre)
    description = models.TextField(max_length=2048, default="")

    def _get_page(self):
        """
        Search for the game on wikipedia
        Returns wikipedia.WikipediaPage or None
        """
        page = None

        try:
            page = wikipedia.page(self.name + " game")
        except wikipedia.exceptions.PageError or wikipedia.exceptions.DisambiguationError:
            pass

        return page

    def fetch_description(self):
        """
        Fetch game description from wikipedia and save it in the model
        """
        page = self._get_page()

        if page:
            self.description = page.summary

    def fetch_genre(self):
        """
        Fetch game page from wikipedia, parse its genre and save it in the model
        Create a Genre model object if Genry does not exist
        """
        page = self._get_page()

        if page:
            soup = BeautifulSoup(page.html(), features="html.parser")

            for table in soup.find_all("table", attrs={"class": "infobox"}):
                for row in table.find_all("tr"):
                    if row.th and row.th.a and "genre" in row.th.a.text.lower():
                        try:
                            genre = Genre.objects.filter(name=row.td.a.text)                            
                        except Genre.DoesNotExist or NoneType:
                            genre = Genre.objects.create(name=row.td.a.text)
                            self.genre.add(genre)



    # Overwrite save method to fetch genre and description if unset
    # def save(self, *args, **kwargs):
    #     if self.pk and self.description == "":
    #         self.fetch_description()

    #     if self.pk and len(self.genre.all) == 0:
    #         self.fetch_genre

    #     return super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
