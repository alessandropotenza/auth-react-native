const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// models
const RefreshToken = require("../models/RefreshToken");

exports.handleRefreshToken = async (req, res, next) => {
  // get refresh token from POST body
  const refreshToken = req.body.refreshToken;
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
  try {
    const [userIdData] = await RefreshToken.verifyRefresh(hashedRefreshToken); // returns user id associated with token

    // Invalid refresh token
    if (!userIdData[0]) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            const err = new Error("Invalid Refresh Token");
            err.statusCode = 401;
            throw err;
          }
          // invalidate all refresh tokens if invalid token used
          // forces re-login when current access token expires
          await RefreshToken.invalidateAll(decoded.userId);
        }
      );
      const err = new Error("Not authorized");
      err.statusCode = 401;
      throw err;
    }

    const userId = userIdData[0].id;

    // Valid refresh token
    // revoke token once it's used (single use)
    await RefreshToken.revoke(hashedRefreshToken);

    // check token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || decoded.userId !== userId) {
          const err = new Error("Invalid Refresh Token");
          err.statusCode = 401;
          throw err;
        }
        // Valid refresh token
        // Issue new access token
        const accessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );
        // Also issue new refresh token
        const newRefreshToken = jwt.sign(
          { userId: decoded.userId },
          process.env.REFRESH_TOKEN_SECRET
        );
        const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, 12);
        new RefreshToken(newHashedToken, decoded.userId).addRefresh(); //add refresh token to database
        res.status(200).json({ accessToken, newRefreshToken }); //send new tokens
      }
    );
  } catch (err) {
    next(err);
  }
};
