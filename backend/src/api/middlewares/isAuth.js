const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const err = new Error("No authorization header was set");
    err.statusCode = 401;
    return next(err);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    req.userID = decodedToken.userID;
    next();
  } catch (err) {
    // if token expired, throws a TokenExpiredError, and err.message is "jwt expired"D
    next(err);
  }
};
