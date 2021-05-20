const signoutRouter = require('express').Router();

const { signout } = require('../controllers/users');

signoutRouter.delete('/', signout);

module.exports = signoutRouter;
