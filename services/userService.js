const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const walletService = require('./walletService');

const service = new walletService();



class userService{
  constructor(){
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    delete data.confirmPassword;
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    const newWallet = await service.create(newUser.id);
    delete newUser.dataValues.password;
    return {newUser, newWallet};
  }

  async find() {
    const users = await models.User.findAll({
      include: [
        {
          association: 'wallet',
          include: ['operations']
        }
      ]
    });
    return users;
  };

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: [
        {
          association: 'wallet',
          include: ['operations']
        }
      ]
    });
    if (!user){
      throw boom.notFound('User not found');
    } else{
      return user;
    }
  };

  async findByEmail(email){
    const user = await models.User.findOne({
      where: { email }
    });
    return user
  }

  async getPayments(id){
    const user = await models.User.findByPk(id, {
      include: [
        {
          association: 'wallet',
          include: [{
            association: 'operations',
            where:{
              type: 'payment'
            }
          }],
        }
      ]
    });
    if (!user){
      throw boom.notFound('User not found');
    } else{
      return user;
    }
  };

  async getEntries(id){
    const user = await models.User.findByPk(id, {
      include: [
        {
          association: 'wallet',
          include: [{
            association: 'operations',
            where:{
              type: 'entry'
            }
          }],
        }
      ]
    });
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

    const rta = await user.update(data)
    return rta;
  };

  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy()
    return rta;
  }
}

module.exports = userService;
