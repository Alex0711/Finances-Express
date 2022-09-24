const express = require('express');
const operationService = require('../services/operationService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createOperation,
  updateOperationSchema,
  getOperationSchema,
} = require('./../schemas/operationSchema');

const router = express.Router();
const service = new operationService();

router.get('/', async (req, res, next) => {
  try {
    const payments = await service.find();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOperationSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const payment = await service.findOne(id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOperation, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newOperation = await service.create(body);

    res.status(201).json({
      message: 'Created',
      data: {
        newOperation,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(updateOperationSchema, 'body'),
  validatorHandler(getOperationSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newOperation = await service.update(id, body);

    res.status(201).json({
      newOperation,
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getOperationSchema, 'params'),
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
});

module.exports = router;
