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
    const wallet = await models.Wallet.findAll({
      include:  ['user']
    });
    if (!wallet){
      throw boom.notFound('Wallet not found');
    } else{
      return wallet;
    }
  };

  async findOne(id){
    const wallet = await models.Wallet.findByPk(id, {
      include:  ['user']
    });
    if (!wallet){
      throw boom.notFound('Wallet not found');
    } else{
      return wallet;
    }
  };

  async update(id, operation) {
    const wallet = await this.findOne(id);
    if(operation.type === 'payment'){
      wallet.money -= operation.amount;
    };

    if(operation.type === 'entry'){
      wallet.money += operation.amount;
    }

    const rta = await wallet.update(wallet.money)
    return rta;
  };

  async delete(id) {
    const wallet = await this.findOne(id);
    const rta = await wallet.destroy()
    return rta;
  }
}

module.exports = walletService;
