const VaccProgService = require("#services/vaccProgService");

class VaccProgController {
  static async getAllVaccProgs(req, res) {
    try {
      const vaccPrograms = await VaccProgService.getAllVaccProgs();
      res.status(200).json(vaccPrograms);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getVaccProgById(req, res) {
    const vaccProgId = req.params.id;
    try {
      const child = await VaccProgService.getVaccProgById(vaccProgId);

      if (!child) {
        return res.status(404).json({
          error: `Vaccination program not found with id ${vaccProgId}`,
        });
      }
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createVaccProg(req, res) {
    try {
      const child = await VaccProgService.createVaccProg(req.body);
      res
        .status(201)
        .json({ message: "Vaccination program created successfully", child });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateVaccProg(req, res) {
    const vaccProgId = req.params.id;
    try {
      const child = await VaccProgService.updateVaccProg(vaccProgId, req.body);

      if (!child) {
        return res.status(404).json({
          error: `Vaccination program with id ${vaccProgId} not found`,
        });
      }
      res
        .status(200)
        .json({ message: "Vaccination program updated successfully", child });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteVaccProg(req, res) {
    try {
      const vaccProgId = req.params.id;
      const child = await VaccProgService.deleteVaccProg(vaccProgId);

      if (!child) {
        return res.status(404).json({
          error: `Vaccination program with ID ${vaccProgId} not found`,
        });
      }

      res.status(200).json({
        message: `Vaccination program with ID ${vaccProgId} successfully deleted`,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = VaccProgController;
