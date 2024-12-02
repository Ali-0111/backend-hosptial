const bcrypt = require("bcrypt");
const HospitalService = require("#services/hospitalService");

class HospitalController {
  static async getAllHospitals(req, res) {
    try {
      const hospitals = await HospitalService.getAllHospitals();
      res.status(200).json(hospitals);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async findHospitalByName(req, res) {
    const hospital_name = req.params.hospital_name;
    
    try {
      const hospital = await HospitalService.findHospitalByName(hospital_name);

      if (!hospital) {
        return res
          .status(404)
          .json({ error: `hospital not found with name ${hospital_name}` });
      }
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getHospitalById(req, res) {
    const hospId = req.params.id;
    try {
      const hospital = await HospitalService.getHospitalById(hospId);

      if (!hospital) {
        return res
          .status(404)
          .json({ error: `Hospital not found with id ${hospId}` });
      }
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createHospital(req, res) {
    try {
      const hospital = await HospitalService.createHospital(req.body);

      const hashedPassword = await bcrypt.hash("asdf@123", 10);

      const data = {
        hospital_id: hospital.id,
        username: hospital.name,
        password: hashedPassword,
      };

      await HospitalService.registerHospital(data);

      res
        .status(201)
        .json({ message: "Hospital created successfully", hospital });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", err: error.message });
    }
  }

  static async updateHospital(req, res) {
    const hospId = req.params.id;
    try {
      const hospital = await HospitalService.updateHospital(hospId, req.body);

      if (!hospital) {
        return res
          .status(404)
          .json({ error: `Hospital with id ${hospId} not found` });
      }
      res
        .status(200)
        .json({ message: "Hospital updated successfully", hospital });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteHospital(req, res) {
    try {
      const hospId = req.params.id;
      const hospital = await HospitalService.deleteHospital(hospId);

      if (!hospital) {
        return res
          .status(404)
          .json({ error: `Hospital with ID ${hospId} not found` });
      }

      res
        .status(200)
        .json({ message: `Hospital with ID ${hospId} successfully deleted` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async registerHospital(req, res) {
    const { hospital_id, username, password } = req.body;

    if (!username || !password || !hospital_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      hospital_id: hospital_id,
      username: username,
      password: hashedPassword,
    };

    try {
      const hospital = await HospitalService.registerHospital(data);
      res.status(201).json({ message: "hospital registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async logInHospital(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const token_profile = await HospitalService.logInHospital({
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

  static async updateHospitalSecurity(req, res) {
    const { new_password, new_username, old_password, hospital_id } = req.body;

    if (!old_password || !hospital_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const hospital = await HospitalService.updateHospitalSecurity({
        hospital_id,
        old_password,
        new_password,
        new_username,
      });

      if (!hospital) {
        return res.status(404).json({ message: "hospital not found" });
      }

      res.status(200).json({ message: "Hospital security updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}

module.exports = HospitalController;
