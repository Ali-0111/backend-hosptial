const express = require("express");
const routes = require("./routes");
const cors = require('cors')

const app = express();

// cors
app.use(cors())
app.use(express.json());
app.use("/api", routes);

module.exports = app;
