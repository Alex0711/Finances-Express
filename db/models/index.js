const { User, UserSchema } = require('./userModel');
const { Wallet, WalletSchema } = require('./walletModel');
const { Operation, OperationSchema } = require('./operationModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Wallet.init(WalletSchema, Wallet.config(sequelize));
  Operation.init(OperationSchema, Operation.config(sequelize));

  User.associate(sequelize.models);
  Wallet.associate(sequelize.models);
  Operation.associate(sequelize.models);
}

module.exports = { setupModels };
