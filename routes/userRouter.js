const express = require('express');
const userService = require('../services/userService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkSameUser, checkRole } = require('./../middlewares/authHandler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/userSchema');
const passport = require('passport');

const router = express.Router();
const service = new userService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.findOne(id);
      delete user.dataValues.password
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/payments',
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.getPayments(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/entries',
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.getEntries(id);
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
      const data = await service.create(body);

      res.status(201).json({
        message: 'Created',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/newadmin',
  validatorHandler(createUserSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const body = req.body;
      const data = await service.createAdmin(body);

      res.status(201).json({
        message: 'Created',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(201).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.status(200).json({
        message: 'delete',
        id: rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
