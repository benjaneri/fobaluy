const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env') });

const { getClient } = require('../../data-access/redis-config');

const jwt = require('jsonwebtoken');
const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '12h';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjX';

const generateJWTUserPermissions = async function (user, role) {
  let signOptions = {
    expiresIn: EXPIRATION_TIME,
  };
  let token = jwt.sign({ email: user.email, userId: user.id, role: role }, SECRET_KEY, signOptions);
  return token;
};

const blacklistToken = async function (token) {
  try {
    const redisClient = getClient();
    const expires = 12 * 60 * 60;

    await redisClient.set(token, 'loggedOutToken', { EX: expires });
  } catch (err) {
    throw new Error(err + 'Error accessing redis database');
  }
};

module.exports = { generateJWTUserPermissions, blacklistToken };