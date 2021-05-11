const notFoundRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

notFoundRouter.use('/', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = notFoundRouter;
