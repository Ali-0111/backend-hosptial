const express = require("express");
const nurseRoutes = require("./nurse");
const hospitalRoutes = require("./hospital");
const childRoutes = require("./child");
const vaccineRoutes = require("./vaccine");

const router = express.Router();

router.use("/nurse", nurseRoutes);
router.use("/hospital", hospitalRoutes);
router.use("/child", childRoutes);
router.use("/vaccine", vaccineRoutes);

module.exports = router;
