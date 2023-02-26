const AppError = require('../class/AppError')
const ResponseStatusCode = require('../../config/responseStatusCode')

const ErrorHandler = (error, req, res, next) => {
  console.log(error);

    if (error instanceof AppError) {
        return res.status(error.errorCode).json(error.message);
    }

  return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
};

module.exports = ErrorHandler;
