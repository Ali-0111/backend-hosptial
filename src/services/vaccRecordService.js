const VaccProgService = require("#services/vaccProgService");
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

  static async createManyVaccRecord(data) {
    const { vaccination_program_id, child_id, nurse_id, hospital_id } = data;
    const { vaccination_program_step } = await VaccProgService.getVaccProgById(
      vaccination_program_id
    );

    const groupData = vaccination_program_step.map((step) => {
      const { vaccination_program_id, vaccine_id, step_rank, step_name } = step;
      return {
        child_id: child_id,
        nurse_id: nurse_id,
        hospital_id: hospital_id,
        vaccination_program_id,
        vaccine_id,
        vaccination_date: null,
        step_rank,
        step_name,
        step_status: "pending",
      };
    });

    return await prisma.vaccine_record.createMany({ data: groupData });
  }

  static async updateVaccRecord(id, data) {
    const {child_id, nurse_id, hospital_id, vaccination_program_id, step_rank, step_status} = data;
    try {
      return await prisma.vaccine_record.updateMany({
        where: { child_id: parseInt(child_id), vaccination_program_id: parseInt(vaccination_program_id),step_rank: parseInt(step_rank) },
        data: {
          step_status: step_status,
          nurse_id: nurse_id,
          hospital_id: hospital_id,
          vaccination_date: new Date(),
        },
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
