const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/helpers").generateTokens;

// models
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [userData] = await User.getUser(email);
    if (userData[0]) {
      const err = new Error("A user with this email already exists");
      err.statusCode = 409;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(email, hashedPassword);
    await user.signUp();
    const [idData] = await user.getID();
    const userID = idData[0].id;

    // issue auth tokens
    const { accessToken, refreshToken } = await generateTokens(userID);

    res.status(201).json({
      message: "user created",
      userID,
      accessToken,
      refreshToken,
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
    if (!passwordsMatch) {
      const err = new Error("Passwords do not match");
      err.statusCode = 401;
      throw err;
    }

    // issue auth tokens
    const { accessToken, refreshToken } = await generateTokens(user.id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
