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
    try {
      const nurse = await NurseService.getNurseById(req.params.id);
      if (!nurse) {
        return res.status(404).json({ error: "Nurse not found" });
      }
      res.status(200).json(nurse);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createNurse(req, res) {
    try {
      const nurse = await NurseService.createNurse(req.body);
      res.status(201).json(nurse);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateNurse(req, res) {
    try {
      const nurse = await NurseService.updateNurse(req.params.id, req.body);
      if (!nurse) {
        return res.status(404).json({ error: "Nurse not found" });
      }
      res.status(200).json(nurse);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteNurse(req, res) {
    try {
      const nurse = await NurseService.deleteNurse(req.params.id);
      if (!nurse) {
        return res.status(404).json({ error: "Nurse not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = NurseController;
