const prisma = require("#prismaClient");

class NurseService {
  static async getAllNurses() {
    return await prisma.nurse.findMany({take: 10});
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
      return await prisma.nurse.findMany(
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
}

module.exports = NurseService;
