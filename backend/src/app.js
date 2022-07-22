const express = require("express");

require("dotenv").config();

const app = express();

// import routes
const authRoutes = require("./api/routes/auth");

// use routes
app.use(authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
