const errorCodes = require("../errorCodes");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (errorCodes) {
    case errorCodes.bad_request:
      res.json({
        title: "Bad Request",
        message: err.message,
        Stack: err.stack,
      });
      break;
    case errorCodes.unauthorized:
      res.json({
        title: "Unauthorized",
        message: err.message,
        Stack: err.stack,
      });
      break;
    case errorCodes.forbidden:
      res.json({
        title: "Forbidden",
        message: err.message,
        Stack: err.stack,
      });
      break;
    case errorCodes.not_found:
      res.json({
        title: "Not found",
        message: err.message,
        Stack: err.stack,
      });
      break;
    case errorCodes.server_error:
      res.json({
        title: "Server error",
        message: err.message,
        Stack: err.stack,
      });
      break;

    default:
      console.log("no errors ! ");
      break;
  }
};

module.exports = errorHandler;
