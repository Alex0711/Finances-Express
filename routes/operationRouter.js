const express = require('express');
const passport = require('passport');
const { checkRole, isMyOperation } = require('./../middlewares/authHandler');
const operationService = require('../services/operationService');
const validatorHandler = require('../middlewares/validatorHandler');
const { updateOperationSchema, getOperationSchema, } = require('./../schemas/operationSchema');

const router = express.Router();
const service = new operationService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const operations = await service.find();
      res.status(200).json(operations);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getOperationSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  isMyOperation,
  async (req, res, next) => {
    // const { id } = req.params;
    try {
      // const operation = await service.findOne(id);
      const operation = req.operation;
      res.status(200).json(operation);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateOperationSchema, 'body'),
  validatorHandler(getOperationSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  isMyOperation,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newOperation = await service.update(id, body);

      res.status(201).json(newOperation);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOperationSchema, 'params'),
  isMyOperation,
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
