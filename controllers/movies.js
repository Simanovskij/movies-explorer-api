const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
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
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы невалидные данные'));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.movieId).select('+owner')
    .orFail(new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (movie.owner.equals(owner)) {
        return movie.remove().then(() => {
          res.send({ message: 'Фильм удален' });
        });
      }
      throw new ForbiddenError('Нет прав для удаления');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('id фильма указан неверно'));
      }
      next(err);
    });
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
