const NurseService = require("#services/nurseService");

class NurseController {
  static async getAllNurses(req, res) {
    try {
      const nurses = await NurseService.getAllNurses();
      res.status(200).json(nurses);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getNurseById(req, res) {
    const nurseId = req.params.id;
    try {
      const nurse = await NurseService.getNurseById(nurseId);

      if (!nurse) {
        return res
          .status(404)
          .json({ error: `Nurse not found with id ${nurseId}` });
      }
      res.status(200).json(nurse);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createNurse(req, res) {
    try {
      const nurse = await NurseService.createNurse(req.body);
      res.status(201).json({ message: "Nurse created successfully", nurse });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateNurse(req, res) {
    const nurseId = req.params.id;
    try {
      const nurse = await NurseService.updateNurse(nurseId, req.body);

      if (!nurse) {
        return res
          .status(404)
          .json({ error: `Nurse with id ${nurseId} not found` });
      }
      res.status(200).json({ message: "Nurse updated successfully", nurse });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteNurse(req, res) {
    try {
      const nurseId = req.params.id;
      const nurse = await NurseService.deleteNurse(nurseId);

      if (!nurse) {
        return res
          .status(404)
          .json({ error: `Nurse with ID ${nurseId} not found` });
      }

      res
        .status(200)
        .json({ message: `Nurse with ID ${nurseId} successfully deleted` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = NurseController;
