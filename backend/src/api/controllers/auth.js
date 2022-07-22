// database connection
const db = require("../../config/database");

// models
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = new User(email, password);
  try {
    await user.signUp();
    const [idData] = await user.getID();
    const userID = idData[0].id;
    res.json({
      email,
      password,
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
    const [fetchedPasswordData] = await User.getPassword(email);
    if (fetchedPasswordData) {
      const fetchedPassword = fetchedPasswordData[0].password;
      if (fetchedPassword === password) {
        res.json({ message: "match" });
      } else {
        const error = new Error("Passwords do not match");
        error.statusCode = 401;
        throw error;
      }
    }
  } catch (err) {
    next(err);
  }
};
