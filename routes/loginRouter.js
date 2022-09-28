const express = require('express');
const loginService = require('../services/loginService');
const service = new loginService();

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      const user = req.user
      const token = await service.login(user);
      res.status(200).json({user, token});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
