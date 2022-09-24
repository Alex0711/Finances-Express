const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    'Message': 'Hola mi server en express',

  })
})

module.exports = router
