const express = require("express");
const nurseRoutes = require("./nurse");
const hospitalRoutes = require("./hospital");
const childRoutes = require("./child");
const vaccineRoutes = require("./vaccine");
const vaccProgRoutes = require("./vaccProg");

const router = express.Router();

router.use("/nurse", nurseRoutes);
router.use("/hospital", hospitalRoutes);
router.use("/child", childRoutes);
router.use("/vaccine", vaccineRoutes);
router.use("/vaccinationProgram", vaccProgRoutes);

module.exports = router;
