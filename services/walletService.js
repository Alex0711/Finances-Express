const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class walletService{
  constructor(){
  }

  async create(id) {
    const newWallet = await models.Wallet.create({userId: id});
    return newWallet;
  }

  async find(){
    const wallets = await models.Wallet.findAll({
      include:  ['user', 'operations']
    });
    for (const wallet of wallets) {
      delete wallet.dataValues.user.dataValues.password
    }
    if (!wallets){
      throw boom.notFound('Wallet not found');
    } else{
      return wallets;
    }
  };

  async findOne(id){
    const wallet = await models.Wallet.findByPk(id, {
      include:  ['user', 'operations']
    });
    if (!wallet){
      throw boom.notFound('Wallet not found');
    } else{
      delete wallet.dataValues.user.dataValues.password
      return wallet;
    }
  };

  async update(walletId, money) {
    const wallet = await this.findOne(walletId);

    const rta = await wallet.update({ money: wallet.money + money })
    return rta;
  };

  async delete(id) {
    const wallet = await this.findOne(id);
    const rta = await wallet.destroy()
    return rta;
  }
}

module.exports = walletService;
