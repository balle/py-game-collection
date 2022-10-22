FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/
RUN mkdir /code/static

RUN mkdir /data
VOLUME /data
RUN python -c "print(open('/code/py_game_collection/settings.py').read().replace('db.sqlite3','/data/db.sqlite3'), file=open('/code/py_game_collection/settings.py', 'w'))"
RUN python manage.py migrate

EXPOSE 8000/tcp
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
