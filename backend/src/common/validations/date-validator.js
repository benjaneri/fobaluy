const { ElementInvalidException } = require('../exceptions/exceptions');

const throwExceptionIfOneDateIsNotProvided = function (startVal, endVal, message) {
  if (!startVal || !endVal) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfDateInvalid = function (val, message) {
  try {
    let date = new Date(val);
    if (isNaN(date.getTime())) {
      throw new ElementInvalidException(message);
    }
    return date;
  } catch (err) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfDateIsEarlierThanToday = function (val, message) {
  let date = throwExceptionIfDateInvalid(val, 'Invalid date');
  try {
    if (date.getTime() < new Date().getTime()) {
      throw new ElementInvalidException(message);
    }
  } catch (err) {
    throw new ElementInvalidException(message);
  }
};

const throwExceptionIfEndDateIsEarlierThanStartDate = function (startVal, endVal, message) {
  try {
    let startDate = throwExceptionIfDateInvalid(startVal, 'Invalid start date');
    let endDate = throwExceptionIfDateInvalid(endVal, 'Invalid end date');
    if (endDate < startDate) {
      throw new ElementInvalidException(message);
    }
  } catch (err) {
    throw new ElementInvalidException(message);
  }
};

module.exports = {
  throwExceptionIfDateInvalid,
  throwExceptionIfDateIsEarlierThanToday,
  throwExceptionIfEndDateIsEarlierThanStartDate,
  throwExceptionIfOneDateIsNotProvided,
};
