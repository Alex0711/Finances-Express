const express = require('express');
const userService = require('../services/userService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/userSchema');

const router = express.Router();
const service = new userService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:email',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { email } = req.params;
    try {
      const user = await service.findOne(email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);

    res.status(201).json({
      message: 'Created',
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:email',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { email } = req.params;
    const body = req.body;
    const newUser = await service.update(email, body);
    res.status(201).json({
      newUser,
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:email',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { email } = req.params;
    const rta = await service.delete(email);
    res.status(200).json({
      message: 'delete',
      email: rta,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
