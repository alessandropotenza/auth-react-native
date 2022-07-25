const bcrypt = require("bcryptjs");

const RefreshToken = require("../models/RefreshToken");

exports.logout = async (req, res, next) => {
  // get refresh token from POST body
  const refreshToken = req.body.refreshToken;
  const hashedToken = await bcrypt.hash(refreshToken, 12);

  try {
    const [userIdData] = await RefreshToken.verifyRefresh(hashedToken); // returns user id associated with token
    // check if refresh token is valid
    if (!userIdData[0]) {
      const err = new Error("Invalid Refresh Token");
      err.statusCode = 401;
      throw err;
    }

    // Delete refresh token from database
    await RefreshToken.revoke(hashedToken);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
