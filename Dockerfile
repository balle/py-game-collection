FROM python:slim-trixie
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . /code/
WORKDIR /code
RUN apt update
RUN apt upgrade -y
RUN apt install -y python3-poetry
RUN poetry install

RUN mkdir /code/static
RUN mkdir /data
VOLUME /data

RUN python -c "print(open('/code/py_game_collection/settings.py').read().replace('db.sqlite3','/data/db.sqlite3'), file=open('/code/py_game_collection/settings.py', 'w'))"
RUN poetry run python manage.py migrate

EXPOSE 8000/tcp
ENTRYPOINT ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
