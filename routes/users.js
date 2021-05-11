const userRouter = require('express').Router();
const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { updateUserValidate } = require('../middlewares/validate');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidate, updateUserProfile);

module.exports = userRouter;
