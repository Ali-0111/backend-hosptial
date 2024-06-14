const express = require("express");
const NurseController = require("#controllers/nurseController");

const router = express.Router();

router.get("/", NurseController.getAllNurses);
router.get("/:id", NurseController.getNurseById);
router.post("/", NurseController.createNurse);
router.put("/:id", NurseController.updateNurse);
router.delete("/:id", NurseController.deleteNurse);

module.exports = router;
