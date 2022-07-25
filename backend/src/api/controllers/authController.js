const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User(email, hashedPassword);
  try {
    await user.signUp();
    const [idData] = await user.getID();
    const userID = idData[0].id;
    res.status(201).json({
      message: "user created",
      userID,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [userData] = await User.getUser(email);
    if (!userData[0]) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }
    const user = userData[0];
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      // issue access token
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      // issue refresh token
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET
      );
      //add refresh token to database
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
      await new RefreshToken(hashedRefreshToken, user.id).addRefresh();
      res.status(200).json({ accessToken, refreshToken });
    } else {
      const err = new Error("Passwords do not match");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};
