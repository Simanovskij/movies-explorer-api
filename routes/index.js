const router = require('express').Router();
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const signoutRouter = require('./signout');
const auth = require('../middlewares/auth');
const notFoundRouter = require('./notFound');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/signout', signoutRouter);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', notFoundRouter);

module.exports = router;
