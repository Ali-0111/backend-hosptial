const express = require("express");
const VaccProgController = require("#controllers/vaccProgController");

const router = express.Router();

router.get("/", VaccProgController.getAllVaccProgs);
router.get("/:id", VaccProgController.getVaccProgById);
router.post("/create", VaccProgController.createVaccProg);
router.put("/update/:id", VaccProgController.updateVaccProg);
router.delete("/delete/:id", VaccProgController.deleteVaccProg);

module.exports = router;
