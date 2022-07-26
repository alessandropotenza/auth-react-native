const bcrypt = require("bcryptjs");

const RefreshToken = require("../models/RefreshToken");

exports.logout = async (req, res, next) => {
  // get refresh token from POST body
  const refreshToken = req.body.refreshToken;

  try {
    //extract userId and iat from claims
    const base64Payload = refreshToken.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("ascii");
    const { userId, issuedAt } = JSON.parse(payload);

    // check if refresh token exists in database
    const [claimsData] = await RefreshToken.findClaims(issuedAt, userId);
    if (!claimsData[0]) {
      // Refresh token isn't found, still log user out (shouldn't happen)
      return res.status(200).json({ message: "Logged out successfully" });
    }

    // Delete refresh token from database
    await RefreshToken.revoke(issuedAt, userId);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
