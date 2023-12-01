const bcrypt = require('bcrypt');

const { validateLogin } = require('./session-validator');
const { generateJWTUserPermissions, blacklistToken } = require('../tokens/token-service');
const { getUser } = require('../users/user-service');

const { ElementInvalidException } = require('../../common/exceptions/exceptions');

const loginUser = async function (loginRequest) {
  await validateLogin(loginRequest);

  let userDb = await getUser(loginRequest.email);
  if (!userDb) {
    throw new ElementInvalidException(`Player credentials are invalid`);
  }

  let isPasswordValid = await bcrypt.compare(loginRequest.password, userDb.password);
  if (!isPasswordValid) {
    throw new ElementInvalidException(`Player credentials are invalid`);
  }

  let token = await generateJWTUserPermissions(userDb, userDb.role);

  return { token, userId: userDb.id };
};

const logoutUser = async function (token) {
  await blacklistToken(token);
};

module.exports = { loginUser, logoutUser };
