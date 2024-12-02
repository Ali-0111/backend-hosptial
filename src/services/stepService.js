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
