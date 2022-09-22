const { User, UserSchema } = require('./userModel');
const { Wallet, WalletSchema } = require('./walletModel');
const { Operation, OperationSchema } = require('./operationModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = { setupModels };
