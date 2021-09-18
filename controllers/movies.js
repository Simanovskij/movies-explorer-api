const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/badrequest-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findOne(req.params.movieId)
    .select('+owner')
    .orFail(new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (movie.owner.equals(owner)) {
        return movie.remove()
          .then(() => {
            res.send({ message: 'Фильм удален' });
          });
      }
      throw new ForbiddenError('Нет прав для удаления');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('id фильма указан неверно'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
