const ResponseStatusCode = require('./ResponseStatusCode')

class AppResponse{
  constructor(result) {
    this.statusCode = ResponseStatusCode.OK;
    this.result = result;
  }
}

module.exports = AppResponse;