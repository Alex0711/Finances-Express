const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Login')
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Welcome!!!',
    data: {
      ...body,
    }
  })
});

module.exports = router
