const boom = require('@hapi/boom');
const UserService = require('../services/userService');
const service = new UserService

function checkRole(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

function checkSameUser(req, res, next) {
  const user = req.user;
  const { id } = req.params;
  if (user.role === 'admin' || user.sub === Number(id)) {
    next();
  } else {
    next(boom.unauthorized());
  }
}


async function isMyWallet(req, res, next) {
  const payload = req.user;
  const user = await service.findOne(payload.sub)
  const { id: walletId } = req.params;

  if (user.role === 'admin' || user.dataValues.wallet.dataValues.id === Number(walletId)) {
    next();
  } else {
    next(boom.unauthorized('It is not your wallet'));
  }
}

module.exports = { checkSameUser, checkRole, isMyWallet };
