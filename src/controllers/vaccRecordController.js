const vaccRecordService = require("#services/vaccRecordService");

class VaccRecordController {
  static async getAllVaccRecords(req, res) {
    const { child_id } = req.query;
    let records;

    try {
      if (child_id) {
        records = await vaccRecordService.getRecordsForChild(child_id);
      } else {
        records = await vaccRecordService.getAllVaccRecords();
      }
      res.status(200).json(records);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  static async getVaccRecordById(req, res) {
    const record_id = req.params.id;
    try {
      const record = await vaccRecordService.getVaccRecordById(record_id);

      if (!record) {
        return res
          .status(404)
          .json({ error: `Vaccince Record not found with id ${record_id}` });
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createVaccRecord(req, res) {
    try {
      const record = await vaccRecordService.createVaccRecord(req.body);
      res
        .status(201)
        .json({ message: "Vaccine Record created successfully", record });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  static async updateVaccRecord(req, res) {
    const record_id = req.params.id;
    try {
      const record = await vaccRecordService.updateVaccRecord(
        record_id,
        req.body
      );

      if (!record) {
        return res
          .status(404)
          .json({ error: `Vaccine Record with id ${record_id} not found` });
      }
      res
        .status(200)
        .json({ message: "Vaccine Record updated successfully", record });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteVaccRecord(req, res) {
    try {
      const record_id = req.params.id;
      const record = await vaccRecordService.deleteVaccRecord(record_id);

      if (!record) {
        return res
          .status(404)
          .json({ error: `Vaccine Record with ID ${record_id} not found` });
      }

      res.status(200).json({
        message: `Vaccine Record with ID ${record_id} successfully deleted`,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = VaccRecordController;
