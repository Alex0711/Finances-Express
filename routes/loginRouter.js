const express = require('express');
const passport = require('passport');
const loginService = require('../services/loginService');
const service = new loginService();

const router = express.Router();

router.post(
  '/',
  passport.authenticate('local', {session: false}),
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
