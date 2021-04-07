# App de Viajes, servidor


## Para desarrollar

A la misma altura que este repo tenes que sacar [la app react](https://github.com/podemosaprender/app_viajes_react)

Te queda

~~~
app_viajes_django
app_viajes_react
~~~

Después en este directorio
1. `pip install -r requirements.txt`
2. `python manage.py migrate`
3. `python manage.py createsuperuser`
4. `python manage.py runserver`

Deberías poder entrar
* Al [admin](http://127.0.0.1:8000/admin) y crear Lugares con su foto
* A [la app react](http://127.0.0.1:8000/app/index.html) y ver los lugares que creaste con las fotos.


## UserStories

Las ponemos en [esta planilla](https://docs.google.com/spreadsheets/d/10FRtcfJ0NJ_aaoAfjWlT9qxZA2L7TN47WZNOW0oC2BE/edit#gid=0)
