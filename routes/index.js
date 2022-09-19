const express = require('express');
const entryRouter = require('./entryRouter')
const homeRouter = require('./homeRouter');
const paymentRouter = require('./paymentRouter');
const loginRouter = require('./loginRouter');
const signUpRouter = require('./signUpRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/entry', entryRouter);
  router.use('/payments', paymentRouter);
  router.use('/login', loginRouter);
  router.use('/signup', signUpRouter);
}

module.exports = routerApi;
