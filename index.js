const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log('My port ' + port)
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
