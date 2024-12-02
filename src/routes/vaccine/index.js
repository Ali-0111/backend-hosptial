const express = require("express");
const VaccineController = require("#controllers/vaccineController");

const router = express.Router();

router.get("/", VaccineController.getAllVaccines);
router.get("/:id", VaccineController.getVaccineById);
router.post("/create", VaccineController.createVaccine);
router.put("/update/:id", VaccineController.updateVaccine);
router.delete("/delete/:id", VaccineController.deleteVaccine);

module.exports = router;
