const express = require("express");
const vaccRecordController = require("#controllers/vaccRecordController");

const router = express.Router();

router.get("/", vaccRecordController.getAllVaccRecords);
router.get("/:id", vaccRecordController.getVaccRecordById);
router.post("/create", vaccRecordController.createVaccRecord);
router.post("/create_many", vaccRecordController.createManyVaccRecord);
router.put("/update/:id", vaccRecordController.updateVaccRecord);
router.delete("/delete/:id", vaccRecordController.deleteVaccRecord);

module.exports = router;
