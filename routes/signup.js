const signupRouter = require('express').Router();
const { signupValidate } = require('../middlewares/validate');

const { createUser } = require('../controllers/users');

signupRouter.post('/', signupValidate, createUser);

module.exports = signupRouter;
