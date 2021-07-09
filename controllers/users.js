const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/badrequest-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const { name, email } = req.body;
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.send({
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
        } else if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Такой email уже зарегистрирован'));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          //secure: true,
        })
        .send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

const signout = (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      //secure: true,
      sameSite: 'None',
    })
    .send({ message: 'Успешный выход' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('id пользователя указан неверно'));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true }
  )
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
  signout,
};
