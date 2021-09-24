const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const validateEmail = function (email) {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

const AuthenticationError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Новый пользователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail],
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthenticationError('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthenticationError('Неправильные email или пароль');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
