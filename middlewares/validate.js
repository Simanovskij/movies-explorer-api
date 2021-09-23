const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?([\da-z-.])+\.([a-z]{2,6})([\da-zA-Z-._~:?#[\]@!$&'()*+,;=/])*\/?#?$/;
const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const signupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(email),
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
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(email),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  moviesValidate,
  updateUserValidate,
};
