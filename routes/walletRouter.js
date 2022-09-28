const express = require('express');
const WalletService = require('../services/walletService');
const OperationService = require('../services/operationService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { getWalletSchema } = require('./../schemas/walletSchema');
const { createOperationSchema } = require('./../schemas/operationSchema');
const { isMyWallet, checkRole } = require('./../middlewares/authHandler');
const passport = require('passport');

const router = express.Router();
const service = new WalletService();
const operationService = new OperationService();

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
  validatorHandler(getWalletSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  isMyWallet,
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

router.post(
  '/:id',
  validatorHandler(getWalletSchema, 'params'),
  validatorHandler(createOperationSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  isMyWallet,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await operationService.create({
        ...body,
        walletId: id
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getWalletSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  isMyWallet,
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
