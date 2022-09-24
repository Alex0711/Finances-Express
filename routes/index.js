const express = require('express');
const userRouter = require('./userRouter')
const walletRouter = require('./walletRouter')
const operationRouter = require('./operationRouter');
const homeRouter = require('./homeRouter');
const loginRouter = require('./loginRouter');
const signUpRouter = require('./signUpRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/users', userRouter);
  router.use('/wallet', walletRouter)
  router.use('/operations', operationRouter);
  router.use('/login', loginRouter);
  router.use('/signup', signUpRouter);
}

module.exports = routerApi;
