const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const payments = []
  for (let i = 0; i < 100; i++) {
    const newPayment = {
      transactionType: faker.finance.transactionType(),
      amount: faker.finance.amount(),
      date: faker.date.recent(),
      type: "Payment"
    }
    payments.push(newPayment)
  }
  res.json(payments)
})

module.exports = router
