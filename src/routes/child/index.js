const express = require("express");
const ChildController = require("#controllers/childController");

const router = express.Router();

router.get("/", ChildController.getAllChilds);
router.get("/:id(\\d+)", ChildController.getChildById);
router.get("/:child_name", ChildController.findChildByName);
router.post("/create", ChildController.createChild);
router.put("/update/:id", ChildController.updateChild);
router.delete("/delete/:id", ChildController.deleteChild);

module.exports = router;
