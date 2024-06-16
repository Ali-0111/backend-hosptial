const express = require("express");
const nurseRoutes = require("./nurse");
const hospitalRoutes = require("./hospital");

const router = express.Router();

router.use("/nurses", nurseRoutes);
router.use("/hospitals", hospitalRoutes);

module.exports = router;
