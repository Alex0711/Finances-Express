const Joi = require('joi');
const roles = ['user', 'admin']

const email = Joi.string().email();
const password = Joi.string().min(3).max(15).label('Password');
const passwordConf = Joi.any()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match'} })
const role = Joi.string().valid(...roles);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  passwordConf: passwordConf.required().equal(Joi.ref('password')),
  role: role,
})

const updateUserSchema = Joi.object({
  password: password.required(),
  newPassword: password.required().label('newPassword'),
  passwordConf: passwordConf.required().equal(Joi.ref('newPassword')),
  role: role,
})

const getUserSchema = Joi.object({
  email: email.required()
})


module.exports = { createUserSchema, updateUserSchema, getUserSchema }
