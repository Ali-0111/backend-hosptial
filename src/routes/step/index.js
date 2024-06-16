const express = require("express");
const StepController = require("#controllers/stepController");

const router = express.Router();

router.get("/", StepController.getAllSteps);
router.get("/:id", StepController.getStepById);
router.post("/create", StepController.createStep);
router.put("/update/:id", StepController.updateStep);
router.delete("/delete/:id", StepController.deleteStep);

module.exports = router;
