FROM python:alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apk update
RUN apk upgrade
RUN apk add poetry

RUN mkdir -p /code/static
RUN mkdir /data
VOLUME /data

RUN addgroup app
RUN adduser -S -G app app
USER app

COPY . /code/
WORKDIR /code

RUN poetry install
RUN python -c "print(open('/code/py_game_collection/settings.py').read().replace('db.sqlite3','/data/db.sqlite3'), file=open('/code/py_game_collection/settings.py', 'w'))"
RUN poetry run python manage.py migrate

EXPOSE 8000/tcp
ENTRYPOINT ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
