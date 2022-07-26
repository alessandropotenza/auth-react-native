const express = require("express");
const router = express.Router();

// controllers
const authController = require("../controllers/authController");

// routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
