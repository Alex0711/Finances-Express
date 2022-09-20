const Joi = require('joi');
const conceptValues = ['food', 'services', 'clothing', 'entertainment', 'home', 'health', 'others']

const id = Joi.string().uuid();
const concept = Joi.string().min(3).max(20).valid(...conceptValues);
const amount = Joi.number().min(0);

const createPaymentSchema = Joi.object({
  concept: concept.required(),
  amount: amount.required(),
});

const updatePaymentSchema = Joi.object({
  concept: concept,
  amount: amount
});

const getPaymentSchema = Joi.object({
  id: id.required()
});

module.exports = { createPaymentSchema, updatePaymentSchema, getPaymentSchema };
