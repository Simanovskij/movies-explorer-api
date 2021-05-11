const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new ForbiddenError('Необходима авторизация'));
  }
};
