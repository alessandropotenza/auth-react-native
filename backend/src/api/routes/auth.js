const express = require("express");
const router = express.Router();

// controllers
const authController = require("../controllers/auth");

// routes
router.get("/signup", authController.signup);
router.get("/login", authController.login);
router.get("/", (req, res, next) => {
  res.send("<h1>Hello, World!</h1>")
})

module.exports = router;
