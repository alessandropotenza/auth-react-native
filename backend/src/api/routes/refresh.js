const express = require("express");
const router = express.Router();

// controllers
const refreshController = require("../controllers/refreshTokenController");

// routes
router.post("/refresh", refreshController.handleRefreshToken);

module.exports = router;
