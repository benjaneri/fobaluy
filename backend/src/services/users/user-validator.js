const {
  throwExeptionIfEmptyString,
  throwExceptionIfMinLength,
  throwExceptionIfNotValidEmail,
} = require('../../common/validations/string-validator');

const { ROLES } = require('../../common/constants/constants');

const validateUser = (user) => {
  validateUsername(user.username);
  validatePassword(user.password);
  validateEmail(user.email);
  validateRole(user.role);
  validateCountry(user.country);
};

const validateUsername = (name) => {
  throwExeptionIfEmptyString(name, 'Name is required');
  throwExceptionIfMinLength(name, 4, 'Username must be at least 4 characters long');
};

const validatePassword = (password) => {
  throwExeptionIfEmptyString(password, 'Password is required');
  throwExceptionIfMinLength(password, 6, 'Password must be at least 6 characters long');

  let numericCharacters = password.match(/\d/g);
  if (!numericCharacters || numericCharacters.length < 1) {
    throwExceptionIfMinLength('', 1, 'Password must contain at least 1 number');
  }
};

const validateEmail = (email) => {
  throwExceptionIfNotValidEmail(email, 'Email is not valid');
};

const validateRole = (role) => {
  if (role) {
    if (!ROLES.includes(role)) {
      throwExeptionIfEmptyString('', 'Role is not valid');
    }
  }
};

const validateCountry = (country) => {
  throwExeptionIfEmptyString(country, 'Country is required');
}

module.exports = validateUser;
