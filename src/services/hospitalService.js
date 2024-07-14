const prisma = require("#prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// SECRET_KEY
const SECRET_KEY = process.env.SECRET_KEY;

class HospitalService {
  static async getAllHospitals() {
    return await prisma.hospital.findMany({take: 10});
  }

  static async getHospitalById(id) {
    try {
      return await prisma.hospital.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async findHospitalByName(name) {
    try {
      return await prisma.hospital.findMany(
        { where: { 
            name: {
              contains: name
            }
          }
        });
    } catch (err) {
      return null;
    }
  }

  static async createHospital(data) {
    return await prisma.hospital.create({ data });
  }

  static async updateHospital(id, data) {
    try {
      return await prisma.hospital.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteHospital(id) {
    try {
      return await prisma.hospital.delete({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async registerHospital(data) {
    return await prisma.hospital_credentials.create({ data });
  }

  static async logInHospital(data) {
    const { username, password } = data;

    const rec = await prisma.hospital_credentials.findUnique({
      where: { username },
      include: { hospital: true },
    });

    if (!rec) {
      return null;
    }

    const checkPassword = await bcrypt.compare(password, rec.password);

    if (!checkPassword) {
      return null;
    }

    const token = jwt.sign({ username: rec.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    delete rec.password;
    return { profile: rec, token };
  }

  static async updateHospitalSecurity(data) {
    const { hospital_id, old_password, new_username, new_password } = data;
    try {
      const hospitalRec = await prisma.hospital_credentials.findUnique({
        where: { hospital_id: hospital_id },
      });

      if (!hospitalRec) {
        throw new Error("Hospital not found");
      }

      // Verify the old password
      const isPasswordCorrect = await bcrypt.compare(
        old_password,
        hospitalRec.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect old password");
      }

      // Prepare the update data object
      const updateData = {};

      if (new_username) {
        updateData.username = new_username;
      }

      if (new_password) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        updateData.password = hashedPassword;
      }

      // Update the nurse's credentials
      const updatedHospital = await prisma.hospital_credentials.update({
        where: { hospital_id: hospital_id },
        data: updateData,
      });

      return updatedHospital;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = HospitalService;
