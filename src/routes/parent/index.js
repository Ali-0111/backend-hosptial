const authMiddleware = require("#middlewares/authMiddleware");
const ParentController = require("#controllers/parentController");

const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, ParentController.getAllParents);
router.get("/:id(\\d+)", authMiddleware, ParentController.getParentById);
router.get("/:parent_name", authMiddleware, ParentController.findParentByName);
router.post("/create", ParentController.createParent);
router.put("/update/:id", authMiddleware, ParentController.updateParent);
router.delete("/delete/:id", authMiddleware, ParentController.deleteParent);

// security layer
router.post("/register", ParentController.registerParent);
router.post("/login", ParentController.logInParent);
router.post("/security", authMiddleware, ParentController.updateParentSecurity);

module.exports = router;
