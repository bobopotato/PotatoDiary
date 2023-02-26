const JsonWebToken = require('jsonwebtoken');
const AppError = require('../class/AppError');
const { tryCatch } = require('../utils/tryCatch')


const authenticateUser = tryCatch((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    JsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw AppError.unauthorized(`Error = ${err}`)
      }
      req.user = user.result;
      return next();
    });
  }
  else {
    throw AppError.unauthorized(``) ;
  }
});

module.exports = {
  authenticateUser,
};
