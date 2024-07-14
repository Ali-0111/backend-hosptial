const bcrypt = require("bcrypt");

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
    const nurse_id = req.params.id;
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

  static async findNurseByName(req, res) {
    const name = req.params.nurse_name;
    try {
      const nurse = await NurseService.findNurseByName(name);

      if (!nurse) {
        return res
          .status(404)
          .json({ error: `Nurse not found with name ${name}` });
      }
      res.status(200).json(nurse);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createNurse(req, res) {
    try {
      const nurse = await NurseService.createNurse(req.body);

      const hashedPassword = await bcrypt.hash('asdf@123', 10);
      
      const data = {
        nurse_id: nurse.id,
        username: nurse.phone,
        password: hashedPassword,
      };

      await NurseService.registerNurse(data);

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
      res
        .status(500)
        .json({ error: "Internal Server Error", m: error.message });
    }
  }

  static async registerNurse(req, res) {
    const { nurse_id, username, password } = req.body;

    if (!username || !password || !nurse_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      nurse_id: nurse_id,
      username: username,
      password: hashedPassword,
    };

    try {
      const nurse = await NurseService.registerNurse(data);
      res.status(201).json({ message: "Nurse registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async logInNurse(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const token_profile = await NurseService.logInNurse({
        username,
        password,
      });

      if (!token_profile) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(201).json({ ...token_profile });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async updateNurseSecurity(req, res) {
    const { new_password, new_username, old_password, nurse_id } = req.body;

    if (!old_password || !nurse_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const nurse = await NurseService.updateNurseSecurity({
        nurse_id,
        old_password,
        new_password,
        new_username,
      });

      if (!nurse) {
        return res.status(404).json({ message: "Nurse not found" });
      }

      res.status(200).json({ message: "Nurse security updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}

module.exports = NurseController;
