const express = require('express');
const loginService = require('../services/loginService');
const service = new loginService();

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      const token = await service.login(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
