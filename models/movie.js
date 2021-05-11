const mongoose = require('mongoose');

const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 150,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(data) {
        return validator.isURL(data);
      },
    },
  },
  trailer: {
    type: String,
    validate: {
      validator(data) {
        return validator.isURL(data);
      },
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator(data) {
        return validator.isURL(data);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator(data) {
        return /^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(data);
      },
    },
  },
  nameEN: {
    type: String,
    validate: {
      validator(data) {
        return /^[?!,.a-zA-Z0-9\s]+$/.test(data);
      },
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);