const prisma = require("#prismaClient");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SECRET_KEY
const SECRET_KEY = process.env.SECRET_KEY;
class NurseService {
  static async getAllNurses() {
    return await prisma.nurse.findMany({ take: 10 });
  }

  static async getNurseById(id) {
    try {
      return await prisma.nurse.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async findNurseByName(name) {
    try {
      return await prisma.nurse.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
    } catch (err) {
      return null;
    }
  }

  static async createNurse(data) {
    return await prisma.nurse.create({ data });
  }

  static async updateNurse(id, data) {
    try {
      return await prisma.nurse.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteNurse(id) {
    try {
      return await prisma.nurse.delete({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async registerNurse(data) {
    return await prisma.nurse_credentials.create({ data });
  }

  static async logInNurse(data) {
    const { username, password } = data;

    const rec = await prisma.nurse_credentials.findUnique({
      where: { username },
      include: { nurse: { include: { hospital: true } } },
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

    return { profile: rec.nurse, token };
  }

  static async updateNurseSecurity(data) {
    const { nurse_id, old_password, new_username, new_password } = data;
    try {
      const nurseRec = await prisma.nurse_credentials.findUnique({
        where: { nurse_id: nurse_id },
      });

      if (!nurseRec) {
        throw new Error("Nurse not found");
      }

      // Verify the old password
      const isPasswordCorrect = await bcrypt.compare(
        old_password,
        nurseRec.password
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
      const updatedNurse = await prisma.nurse_credentials.update({
        where: { nurse_id: nurse_id },
        data: updateData,
      });

      return updatedNurse;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = NurseService;
