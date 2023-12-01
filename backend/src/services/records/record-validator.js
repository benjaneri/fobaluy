const { throwExeptionIfEmptyString, throwExceptionIfCeroOrLess } = require('../../common/validations/string-validator');

const validateTopAmount = (amount) => {
  throwExeptionIfEmptyString(amount, 'Top rating amount must be provided');
  throwExceptionIfCeroOrLess(amount, 'Top rating amount must be greater than 0');
};

module.exports = { validateTopAmount };
