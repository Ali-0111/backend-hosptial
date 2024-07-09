const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// cors and options

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use("/api", routes);

module.exports = app;
