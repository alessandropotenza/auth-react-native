const express = require("express");
const router = express.Router();

// controllers
const homeController = require("../controllers/homeController");

// routes
router.get("/home", homeController.getMessage);

module.exports = router;
