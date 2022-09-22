function logErrors (err, req, res, next) {
  //Acá puedo agregar un logger si es necesario
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
};

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err);
};

function queryErrorHandler(err, req, res, next) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    const rta = err.errors[0].message
    res.status(409).json({
      'message': rta
    })
  }
  next(err);
};

module.exports = { logErrors, errorHandler, boomErrorHandler, queryErrorHandler }
