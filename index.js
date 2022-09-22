const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, queryErrorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const whiteList = ['https://example.com']
// const options = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin) || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('No permitido'))
//     }
//   }
// }
// app.use(cors(options))

app.use(cors());

app.listen(port, () => {
  console.log('My port ' + port)
})

routerApi(app)

app.use(logErrors);
app.use(queryErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);
