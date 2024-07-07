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
      res
        .status(201)
        .json({ message: "Hospital created successfully", hospital });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
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
}

module.exports = HospitalController;
