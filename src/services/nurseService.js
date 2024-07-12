const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("#prismaClient");

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
}

module.exports = NurseService;
