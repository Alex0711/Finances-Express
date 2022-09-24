const express = require('express');
const walletService = require('../services/walletService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { getWalletSchema } = require('./../schemas/walletSchema');

const router = express.Router();
const service = new walletService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getWalletSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getWalletSchema, 'params'),
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
