const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// models
const RefreshToken = require("../models/RefreshToken");

exports.handleRefreshToken = async (req, res, next) => {
  let userId;
  let issuedAt;

  // get refresh token from POST body
  const refreshToken = req.body.refreshToken;

  try {
    // check if token is valid, extract userId and issuedAt from claims if so
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
        userId = decoded.userId;
      }
    );
    const [claimsData] = await RefreshToken.findClaims(issuedAt, userId); // returns matching claims for the refresh token recieved if they exist in db

    // Invalid refresh token, claims don't match any records
    if (!claimsData[0]) {
      // invalidate all refresh tokens for a user if invalid token used
      // this will force a re-login when current access token expires
      await RefreshToken.invalidateAll(userId);
      const err = new Error("Not authorized");
      err.statusCode = 401;
      throw err;
    }

    // Valid token found
    await RefreshToken.revoke(issuedAt, userId); // revoke token once it's used (single use)

    // Issue new access token
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    // Also issue new refresh token (refresh token rotation)
    const newRefreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET
    );

    //get iat field from newRefreshToken payload
    const base64Payload = newRefreshToken.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("ascii");
    const newIssuedAt = JSON.parse(payload).iat;

    new RefreshToken(newIssuedAt, userId).addClaims(); //add new refresh token claims to database
    res.status(200).json({ accessToken, newRefreshToken }); //send new tokens as response
  } catch (err) {
    next(err);
  }
};
