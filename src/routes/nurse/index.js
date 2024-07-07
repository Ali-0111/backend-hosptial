const express = require("express");
const NurseController = require("#controllers/nurseController");

const router = express.Router();

router.get("/", NurseController.getAllNurses);
router.get("/:id(\\d+)", NurseController.getNurseById);
router.get("/:nurse_name", NurseController.findNurseByName);
router.post("/create", NurseController.createNurse);
router.put("/update/:id", NurseController.updateNurse);
router.delete("/delete/:id", NurseController.deleteNurse);

module.exports = router;
