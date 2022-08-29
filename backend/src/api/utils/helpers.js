const jwt = require("jsonwebtoken");

// models
const RefreshToken = require("../models/RefreshToken");

exports.generateTokens = async (userID) => {
  // issue access token
  const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  // issue refresh token
  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET);

  // get iat field from refreshToken payload
  const base64Payload = refreshToken.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString("ascii");
  const issuedAt = JSON.parse(payload).iat;

  // add refresh token claims to database
  await new RefreshToken(issuedAt, userID).addClaims();

  return { accessToken, refreshToken };
};
