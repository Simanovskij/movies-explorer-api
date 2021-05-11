const movieRouter = require('express').Router();

const {
  deleteMovie,
  createMovie,
  getMovies,
} = require('../controllers/movies');

const { moviesValidate } = require('../middlewares/validate');

movieRouter.get('/', getMovies);
movieRouter.post('/', moviesValidate, createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
