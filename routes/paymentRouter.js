const express = require('express');
const paymentsService = require('../services/paymentsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  createPaymentSchema,
  updatePaymentSchema,
  getPaymentSchema,
} = require('./../schemas/paymentSchema');

const router = express.Router();
const service = new paymentsService();

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
  validatorHandler(getPaymentSchema, 'params'),
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
  validatorHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newPayment = await service.create(body);

    res.status(201).json({
      message: 'Created',
      data: {
        newPayment,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(updatePaymentSchema, 'body'),
  validatorHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newPayment = await service.update(id, body);
    res.status(201).json({
      newPayment,
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getPaymentSchema, 'params'),
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
