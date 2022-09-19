const express = require('express');
const faker = require('faker')
const router = express.Router();

router.get('/', (req, res) => {
  const payments = []
  for (let i = 0; i < 100; i++) {
    const newPayment = {
      transactionType: faker.finance.transactionType(),
      amount: faker.finance.amount(),
      date: faker.date.recent(),
      type: "Entry"
    }
    payments.push(newPayment)
  }
  res.status(200).json(payments)
});

router.post('/', (req, res) => {
  const body = req.body;
  const date = new Date();
  const timeZone = date.getTimezoneOffset();
  res.status(201).json({
    message: 'Created',
    data: {
      ...body,
      date: new Date(date+ 'GMT' + timeZone),
      type: 'Entry'
    },
    timeZone
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(201).json({
    message: 'update',
    data: body,
    id
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'delete',
    id
  })
});

module.exports = router
