const { evalException } = require('../exceptions/exceptions');

const errorMiddleware = (err, req, res, next) => {
  let evalResult = evalException(err, res);
  return evalResult;
};

module.exports = errorMiddleware;
