const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }

        res.status(200);
        req.user = decoded.user;
        next();
      });
      if (!token) {
        res.status(401);
        throw new Error({
          message: "token is missing or user is unauthorized",
        });
      }
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = validateToken;
