const express = require('express');
const paymentsService = require('../services/paymentsService');

const router = express.Router();
const service = new paymentsService();

router.get('/', async(req, res) => {
  const payments = await service.find();
  res.status(200).json(payments);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await service.findOne(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newPayment = await service.create(body)

  res.status(201).json({
    message: 'Created',
    data: {
      newPayment
    }
  })
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const newPayment = await service.update(id, body);
  res.status(201).json({
    newPayment
  })
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.status(200).json({
    message: 'delete',
    id: rta,
  })
});

module.exports = router
