const prisma = require("#prismaClient");

class VaccineService {
  static async getAllVaccines() {
    return await prisma.vaccine.findMany({ take: 10 });
  }

  static async getVaccineById(id) {
    try {
      return await prisma.vaccine.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async findVaccineByName(name) {
    try {
      return await prisma.vaccine.findMany({
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

  static async createVaccine(data) {
    return await prisma.vaccine.create({ data });
  }

  static async updateVaccine(id, data) {
    try {
      return await prisma.vaccine.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteVaccine(id) {
    try {
      return await prisma.vaccine.delete({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }
}

module.exports = VaccineService;
