const AppResponse = require('../class/AppResponse')
const AppError = require('../class/AppError')
const ResponseCode = require('../class/ResponseStatusCode')

const ResponseHandler = (myRes, req, res, next) => {

    if (myRes instanceof AppResponse) {
        return res.status(myRes.statusCode).json({
            data: myRes.result,
        });
    }
    
    if (myRes instanceof AppError) {
        console.log(`running here ${myRes.message}`)
        console.log(myRes)
        return res.status(myRes.statusCode).json(myRes.message);
    }
    console.log(`code error = ${myRes.message}`)
    console.log(myRes)
    return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json(myRes.message);
};

module.exports = ResponseHandler;
