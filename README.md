# movies-explorer-api

| Запрос | Описание |
| ------ | ------ |
| GET /users/me | возвращает информацию о пользователе (email и имя) |
| PATCH /users/me | обновляет информацию о пользователе |
| GET /movies | все сохранённые пользователем фильмы; |
| POST /movies | создаёт фильм с переданными в теле данными (обязательные поля country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN) |
| DELETE /movies/movieId | удаляет сохранённый фильмы по _id |
| POST /signup | создаёт пользователя с переданными в теле данными (name, email, password) |
| POST /signin | возвращает JWT, если в теле запроса переданы правильные почта и пароль. |

## API :
  <https://api.kinchiki.nomoredomains.club>
## Публичный IP:
##### 84.201.170.101
