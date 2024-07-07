const prisma = require("#prismaClient");

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
}

module.exports = HospitalService;
