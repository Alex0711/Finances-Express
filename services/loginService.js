const { config } = require('../config/config');
const jwt = require('jsonwebtoken');

class loginService{
  constructor(){
  }

  async login(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);

    return token
  }
}

module.exports = loginService;
