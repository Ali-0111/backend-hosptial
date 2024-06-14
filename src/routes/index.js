const express = require("express");
const nurseRoutes = require("./nurse");

const router = express.Router();

router.use("/nurses", nurseRoutes);

module.exports = router;
