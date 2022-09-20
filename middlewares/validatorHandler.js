const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    //la inf. puede venir en body, params o query
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
};

module.exports = validatorHandler;
