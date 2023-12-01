const { throwExeptionIfEmptyString } = require('../../common/validations/string-validator');

const validateLogin = async (loginRequest) => {
  await validateEmail(loginRequest.email);
  await validatePassword(loginRequest.password);
};

const validateEmail = async (email) => {
  throwExeptionIfEmptyString(email, 'Email is required');
};

const validatePassword = async (password) => {
  throwExeptionIfEmptyString(password, 'Password is required');
};

module.exports = { validateLogin };
