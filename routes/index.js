const entryRouter = require('./entryRouter')
const homeRouter = require('./homeRouter');
const paymentRouter = require('./paymentRouter');
const loginRouter = require('./loginRouter');
const signUpRouter = require('./signUpRouter');

function routerApi(app) {
  app.use('/home', homeRouter);
  app.use('/entry', entryRouter);
  app.use('/payments', paymentRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signUpRouter);
}

module.exports = routerApi;
