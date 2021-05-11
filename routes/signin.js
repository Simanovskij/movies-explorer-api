const signinRouter = require('express').Router();
const { signinValidate } = require('../middlewares/validate');

const { login } = require('../controllers/users');

signinRouter.post('/', signinValidate, login);

module.exports = signinRouter;
