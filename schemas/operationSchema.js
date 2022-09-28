const Joi = require('joi');
const paymentValues = ['food', 'services', 'clothing', 'entertainment', 'home', 'health', 'others'];
const entryValues = ['salary', 'sales', 'others'];
const types = ['payment', 'entry'];

const id = Joi.string().uuid();
const type = Joi.string().valid(...types).label('type');
const concept = Joi.string().min(3).max(20);
const amount = Joi.number().min(0);

const createOperationSchema = Joi.object({
  type: type.required(),
  concept: concept.required().when('type', {
    is: 'payment',
    then: Joi.valid(...paymentValues),
    otherwise: Joi.valid(...entryValues),
  }),
  amount: amount.required(),
});

const updateOperationSchema = Joi.object({
  type: type.required(),
  concept: concept.when('type', {
    is: 'payment',
    then: Joi.valid(...paymentValues),
    otherwise: Joi.valid(...entryValues),
  }),
  amount: amount
});

const getOperationSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOperationSchema, updateOperationSchema, getOperationSchema };
