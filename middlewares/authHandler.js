const boom = require('@hapi/boom');
const UserService = require('../services/userService');
const OperationService = require('../services/operationService');
const userService = new UserService()
const operationService = new OperationService()

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
  const user = await userService.findOne(payload.sub)
  const { id: walletId } = req.params;

  if (user.role === 'admin' || user.dataValues.wallet.dataValues.id === Number(walletId)) {
    next();
  } else {
    next(boom.unauthorized('It is not your wallet'));
  }
}

async function isMyOperation(req, res, next) {
  try {
    const { id: opId } = req.params;
    const payload = req.user;
    const operation = await operationService.findOne(opId);
    const userId = operation.dataValues.wallet.dataValues.userId
    console.log(payload)
    if (payload.role ==='admin' || payload.sub === userId) {
      req.operation = operation;
      next();
    } else {
      next(boom.unauthorized())
    }

  } catch (error) {
    next(error);
  }
}

module.exports = { checkSameUser, checkRole, isMyWallet, isMyOperation };
