const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

module.exports = router
