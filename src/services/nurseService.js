const prisma = require("#prismaClient");

class NurseService {
  static async getAllNurses() {
    return await prisma.nurse.findMany();
  }

  static async getNurseById(id) {
    return await prisma.nurse.findUnique({ where: { id: parseInt(id) } });
  }

  static async createNurse(data) {
    return await prisma.nurse.create({ data });
  }

  static async updateNurse(id, data) {
    return await prisma.nurse.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  static async deleteNurse(id) {
    return await prisma.nurse.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = NurseService;
