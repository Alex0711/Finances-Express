const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class userService{
  constructor(){
  }

  async create(data) {
    delete data.confirmPassword;
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  };

  async findOne(id){
    const user = await models.User.findByPk(id);
    if (!user){
      throw boom.notFound('User not found');
    } else{
      return user;
    }
  };

  async update(id, data) {
    const user = await this.findOne(id);
    if(user.password !== data.password) {
      throw boom.unauthorized('Unautorized')
    }
    data.password = data.newPassword;
    delete data.newPassword;
    delete data.confirmPassword

    const rta = user.update(data)
    return rta;
  };

  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy()
    return rta;
  }
}

module.exports = userService;
