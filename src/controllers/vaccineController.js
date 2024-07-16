const VaccineService = require("#services/vaccineService");

class VaccineController {
  static async getAllVaccines(req, res) {
    try {
      const vaccines = await VaccineService.getAllVaccines();
      res.status(200).json(vaccines);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getVaccineById(req, res) {
    const vaccineId = req.params.id;
    try {
      const vaccine = await VaccineService.getVaccineById(vaccineId);

      if (!vaccine) {
        return res
          .status(404)
          .json({ error: `Vaccine not found with id ${vaccineId}` });
      }
      res.status(200).json(vaccine);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async findVaccineByName(req, res) {
    const vaccine_name = req.params.vaccine_name;

    try {
      const vaccine = await VaccineService.findVaccineByName(vaccine_name);

      if (!vaccine) {
        return res
          .status(404)
          .json({ error: `Vaccine not found with name ${vaccine_name}` });
      }
      res.status(200).json(vaccine);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createVaccine(req, res) {
    try {
      const vaccine = await VaccineService.createVaccine(req.body);
      res
        .status(201)
        .json({ message: "Vaccine created successfully", vaccine });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateVaccine(req, res) {
    const vaccineId = req.params.id;
    try {
      const vaccine = await VaccineService.updateVaccine(vaccineId, req.body);

      if (!vaccine) {
        return res
          .status(404)
          .json({ error: `Vaccine with id ${vaccineId} not found` });
      }
      res
        .status(200)
        .json({ message: "Vaccine updated successfully", vaccine });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteVaccine(req, res) {
    try {
      const vaccineId = req.params.id;
      const vaccine = await VaccineService.deleteVaccine(vaccineId);

      if (!vaccine) {
        return res
          .status(404)
          .json({ error: `Vaccine with ID ${vaccineId} not found` });
      }

      res
        .status(200)
        .json({ message: `Vaccine with ID ${vaccineId} successfully deleted` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = VaccineController;
