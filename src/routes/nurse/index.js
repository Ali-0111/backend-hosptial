const express = require("express");
const NurseController = require("#controllers/nurseController");

const router = express.Router();

router.get("/", NurseController.getAllNurses);
router.get("/:id", NurseController.getNurseById);
router.post("/create", NurseController.createNurse);
router.put("/update/:id", NurseController.updateNurse);
router.delete("/delete/:id", NurseController.deleteNurse);

module.exports = router;
