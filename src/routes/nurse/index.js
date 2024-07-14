const authMiddleware = require("#middlewares/authMiddleware");
const NurseController = require("#controllers/nurseController");

const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, NurseController.getAllNurses);
router.get("/:id(\\d+)", authMiddleware, NurseController.getNurseById);
router.get("/:nurse_name", authMiddleware, NurseController.findNurseByName);
router.post("/create", authMiddleware, NurseController.createNurse);
router.put("/update/:id", authMiddleware, NurseController.updateNurse);
router.delete("/delete/:id", authMiddleware, NurseController.deleteNurse);

// security layer 
router.post("/register", NurseController.registerNurse);
router.post("/login", NurseController.logInNurse);
router.post("/security", authMiddleware, NurseController.updateNurseSecurity);

module.exports = router;
