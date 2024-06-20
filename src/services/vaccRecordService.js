const prisma = require("#prismaClient");

class VaccRecordService {
  static async getAllVaccRecords() {
    return await prisma.vaccine_record.findMany();
  }

  static async getRecordsForChild(child_id) {
    return await prisma.vaccine_record.findMany({
      where: { child_id: parseInt(child_id) },
    });
  }

  static async getVaccRecordById(id) {
    try {
      return await prisma.vaccine_record.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }

  static async createVaccRecord(data) {
    return await prisma.vaccine_record.create({ data });
  }

  static async updateVaccRecord(id, data) {
    try {
      return await prisma.vaccine_record.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteVaccRecord(id) {
    try {
      return await prisma.vaccine_record.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = VaccRecordService;
