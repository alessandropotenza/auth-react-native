// database connection
const db = require("../../config/database");

// models
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const user = new User("potenza1702@gmail.com", "password123");
  await user.signUp();
  const [id] = await user.getID();
  console.log(id);
  res.send("<h1>Success</h1>");
};

exports.login = async (req, res, next) => {
  const email = "potenza1702@gmail.com";
  const [password] = await User.getPassword(email);
  console.log(password);
  res.send("<h1>Success</h1>");
};
