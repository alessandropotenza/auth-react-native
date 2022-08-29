const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [userData] = await User.getUser(email);
    if (userData[0]) {
      const err = new Error("User already exists");
      err.statusCode = 409;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(email, hashedPassword);
    await user.signUp();
    const [idData] = await user.getID();
    const userID = idData[0].id;

    // issue auth tokens
    const { accessToken, refreshToken } = generateTokens(userID);

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

    const { accessToken, refreshToken } = generateTokens(user.id);

    // get iat field from refreshToken payload
    const base64Payload = refreshToken.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("ascii");
    const issuedAt = JSON.parse(payload).iat;

    // add refresh token claims to database
    await new RefreshToken(issuedAt, user.id).addClaims();
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

const generateTokens = (userID) => {
  // issue access token
  const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  // issue refresh token
  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
};
