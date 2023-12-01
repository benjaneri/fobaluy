const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env') });

const { evalException } = require('../exceptions/exceptions');
const { verifyJWT } = require('../../services/tokens/token-validator');

const verifyToken = async function (req, res, next) {
  const authorization = req.header('Authorization');
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  try {
    let decodedToken = await verifyJWT(token);
    req.userEmail = decodedToken.email;
    next();
  } catch (err) {
    return evalException(err, res);
  }
};

const verifyPermissions = (permitedRoles) => {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    const token = authorization ? authorization.replace('Bearer ', '') : null;
    try {
      let decodedToken = await verifyJWT(token);
      if (permitedRoles.includes(decodedToken.role)) {
        next();
      } else {
        return res.status(403).send('User is not authorized to perform this action');
      }
    } catch (err) {
      return evalException(err, res);
    }
  };
};

module.exports = { verifyToken, verifyPermissions };
