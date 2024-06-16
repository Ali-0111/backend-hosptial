const express = require("express");
const HospitalController = require("#controllers/hospitalController");

const router = express.Router();

router.get("/", HospitalController.getAllHospitals);
router.get("/:id", HospitalController.getHospitalById);
router.post("/create", HospitalController.createHospital);
router.put("/update/:id", HospitalController.updateHospital);
router.delete("/delete/:id", HospitalController.deleteHospital);

module.exports = router;