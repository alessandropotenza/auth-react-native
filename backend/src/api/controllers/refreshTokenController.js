const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/helpers").generateTokens;

// models
const RefreshToken = require("../models/RefreshToken");

exports.handleRefreshToken = async (req, res, next) => {
  let userID;
  let issuedAt;

  // get refresh token from POST body
  const refreshToken = req.body.refreshToken;

  try {
    // check if token is valid, extract userID and issuedAt from claims if so
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          const err = new Error("Invalid Refresh Token");
          err.statusCode = 401;
          throw err;
        }
        issuedAt = decoded.iat;
        userID = decoded.userID;
      }
    );

    const [claimsData] = await RefreshToken.findClaims(issuedAt, userID); // returns matching claims for the refresh token recieved if they exist in db
    // Invalid refresh token, claims don't match any records
    if (!claimsData[0]) {
      // invalidate all refresh tokens for a user if invalid token used
      // this will force a re-login when current access token expires
      await RefreshToken.invalidateAll(userID);
      const err = new Error("Not authorized");
      err.statusCode = 401;
      throw err;
    }

    // Valid token found
    await RefreshToken.revoke(issuedAt, userID); // revoke token once it's used (single use)

    // Issue new access token and refresh token (refresh token rotation)
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      userID
    );

    res.status(200).json({ accessToken, newRefreshToken }); //send new tokens as response
  } catch (err) {
    console.log(err);
    next(err);
  }
};
