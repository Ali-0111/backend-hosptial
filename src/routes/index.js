const express = require("express");
const nurseRoutes = require("./nurse");
const hospitalRoutes = require("./hospital");
const childRoutes = require("./child");
const vaccineRoutes = require("./vaccine");
const vaccProgRoutes = require("./vaccProg");
const stepRoutes = require("./step");
const recordRoutes = require("./vaccRec");
const parentRoutes = require("./parent");

const router = express.Router();

router.use("/nurse", nurseRoutes);
router.use("/hospital", hospitalRoutes);
router.use("/child", childRoutes);
router.use("/vaccine", vaccineRoutes);
router.use("/vaccinationProgram", vaccProgRoutes);
router.use("/step", stepRoutes);
router.use("/vaccine_record", recordRoutes);
router.use("/parent", parentRoutes);

module.exports = router;
