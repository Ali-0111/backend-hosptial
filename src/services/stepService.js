const prisma = require("#prismaClient");

// StepService is service for  vaccination_program_step
class StepService {
  static async getAllSteps() {
    return await prisma.vaccination_program_step.findMany();
  }

  static async getAllFilteredSteps(vaccProgId, step_rank = 0) {
    return await prisma.vaccination_program_step.findMany({
      where: {
        vaccination_program_id: parseInt(vaccProgId),
        step_rank: parseInt(step_rank),
      },
    });
  }

  static async getStepById(id) {
    try {
      return await prisma.vaccination_program_step.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }

  static async createStep(data) {
    return await prisma.vaccination_program_step.create({ data });
  }

  static async updateStep(id, data) {
    try {
      return await prisma.vaccination_program_step.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async updateManyStep(data) {
    const {step_rank, vaccination_program_id, step_name} = data
    return await prisma.vaccination_program_step.updateMany({
      where: {vaccination_program_id: parseInt(vaccination_program_id), step_rank: parseInt(step_rank) },
      data: {
        step_name
      },
    });
  }

  static async deleteStep(id) {
    try {
      return await prisma.vaccination_program_step.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = StepService;
