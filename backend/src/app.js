const express = require("express");
const error = require("./api/middlewares/error");

require("dotenv").config();

const app = express();

app.use(express.json()); //parse JSON data from incoming requests

// import routes
const authRoutes = require("./api/routes/auth");
const refreshRoutes = require("./api/routes/refresh");
const homeRoutes = require("./api/routes/home");

// import middleware
const isAuth = require("./api/middlewares/isAuth");

// unprotected routes
app.use(authRoutes);
app.use(refreshRoutes);

// funnel requests to protected routes through the isAuth middleware to verify their access token
app.use(isAuth);

// protected routes
app.use(homeRoutes);

// error handling middleware
app.use(error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
