// responseFormatter.js

function formatResponse(data, message = "Success", status = 200) {
    return {
      status,
      message,
      data,
    };
  }
  
  function responseMiddleware(req, res, next) {
    res.apiSuccess = function (data, message, status) {
      res.status(status || 200).json(formatResponse(data, message, status));
    };
  
    res.apiError = function (data, message, status) {
      res.status(status || 500).json(formatResponse(data, message, status));
    };
  
    next();
  }
  
  module.exports = responseMiddleware;
  