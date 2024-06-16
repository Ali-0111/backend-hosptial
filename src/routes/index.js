const express = require("express");
const nurseRoutes = require("./nurse");
const hospitalRoutes = require("./hospital");
const childRoutes = require("./child");

const router = express.Router();

router.use("/nurses", nurseRoutes);
router.use("/hospitals", hospitalRoutes);
router.use("/children", childRoutes);

module.exports = router;
