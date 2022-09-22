const express = require('express');
const userRouter = require('./userRouter')
const homeRouter = require('./homeRouter');
const operationRouter = require('./operationRouter');
const loginRouter = require('./loginRouter');
const signUpRouter = require('./signUpRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/operations', operationRouter);
  router.use('/users', userRouter);
  router.use('/login', loginRouter);
  router.use('/signup', signUpRouter);
}

module.exports = routerApi;
