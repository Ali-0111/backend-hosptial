const authMiddleware = require("#middlewares/authMiddleware");
const express = require("express");
const HospitalController = require("#controllers/hospitalController");

const router = express.Router();

router.get("/",authMiddleware, HospitalController.getAllHospitals);
router.get("/:id(\\d+)",authMiddleware, HospitalController.getHospitalById);
router.get("/:hospital_name",authMiddleware, HospitalController.findHospitalByName);
router.post("/create",authMiddleware, HospitalController.createHospital);
router.put("/update/:id",authMiddleware, HospitalController.updateHospital);
router.delete("/delete/:id", authMiddleware,HospitalController.deleteHospital);

// security layer 
router.post("/register", HospitalController.registerHospital);
router.post("/login", HospitalController.logInHospital);
router.post("/security", authMiddleware, HospitalController.updateHospitalSecurity);

module.exports = router;
