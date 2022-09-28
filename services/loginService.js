const { config } = require('../config/config');
const userService = require('../services/userService');
const service = new userService();
const jwt = require('jsonwebtoken');

class loginService{
  constructor(){
  }

  async login(data){
    const user = await service.findByEmail(data.email);
    const payload = {
      sub: user.dataValues.id,
      role: user.dataValues.role
    }
    const token = jwt.sign(payload, config.jwtSecret);

    return {user, token}
  }
}

module.exports = loginService;
