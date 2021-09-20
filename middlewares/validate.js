const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?([\da-z-.])+\.([a-z]{2,6})([\da-zA-Z-._~:?#[\]@!$&'()*+,;=/])*\/?#?$/;

const signupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const moviesValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailer: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(25),
    email: Joi.string().email(),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  moviesValidate,
  updateUserValidate,
};
