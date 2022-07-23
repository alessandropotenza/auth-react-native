const bcrypt = require("bcryptjs");

// database connection
const db = require("../../config/database");

// models
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const [hashedPasswordData] = await User.getPassword(email);
    if (!hashedPasswordData[0]) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }
    const hashedPassword = hashedPasswordData[0].password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      res.status(200).json({ message: "match" });
    } else {
      const err = new Error("Passwords do not match");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};
