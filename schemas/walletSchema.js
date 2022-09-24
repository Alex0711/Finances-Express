const Joi = require('joi');

const id = Joi.number().integer();

const getWalletSchema = Joi.object({
  id: id.required()
})


module.exports = { getWalletSchema }
