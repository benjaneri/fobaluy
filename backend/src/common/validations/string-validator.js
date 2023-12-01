const { ElementInvalidException } = require('../exceptions/exceptions');

const throwExeptionIfEmptyString = function (val, message) {
  if (!val) {
    throw new ElementInvalidException(message);
  }
  if (val === '') {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfNotValidEmail = function (val, message) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!val.match(mailformat)) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfMinLength = function (val, length, message) {
  if (val.length < Number(length)) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfMaxLenght = function (val, length, message) {
  if (val.length > Number(length)) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfNotUppercaseLetters = function (val, message) {
  var codeFormat = /^[A-Z]$/;
  for (let i = 0; i < val.length; i++) {
    if (!val[i].match(codeFormat)) {
      throw new ElementInvalidException(message);
    }
  }
};

const throwExceptionIfCeroOrLess = function (val, message) {
  if (val <= 0) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfNotValidCode = function (val, message) {
  var codeFormat = /'^[A-Z]{1,6}$'/;
  if (!val.match(codeFormat)) {
    throw new ElementInvalidException(message);
  }
};

module.exports = {
  throwExeptionIfEmptyString,
  throwExceptionIfNotValidEmail,
  throwExceptionIfMinLength,
  throwExceptionIfNotUppercaseLetters,
  throwExceptionIfCeroOrLess,
  throwExceptionIfNotValidCode,
  throwExceptionIfMaxLenght,
};
