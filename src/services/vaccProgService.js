const prisma = require("#prismaClient");

class VaccProgService {
  static async getAllVaccProgs() {
    return await prisma.vaccination_program.findMany();
  }

  static async getVaccProgById(id) {
    try {
      return await prisma.vaccination_program.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }

  static async createVaccProg(data) {
    return await prisma.vaccination_program.create({ data });
  }

  static async updateVaccProg(id, data) {
    try {
      return await prisma.vaccination_program.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteVaccProg(id) {
    try {
      return await prisma.vaccination_program.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = VaccProgService;