const prisma = require("#prismaClient");

class VaccProgService {
  static async getAllVaccProgs() {
    return await prisma.vaccination_program.findMany({
      include: {
        vaccination_program_step: {
          orderBy: { step_rank: "asc" },
          include: { vaccine: true },
        },
      },
    });
  }

  static async getVaccProgById(id) {
    try {
      return await prisma.vaccination_program.findUnique({
        where: { id: parseInt(id) },
        include: { vaccination_program_step: true },
      });
    } catch (err) {
      return null;
    }
  }

  static async createVaccProg(data) {
    const { name, number_of_steps, steps } = data;
    return await prisma.vaccination_program.create({
      data: {
        name,
        number_of_steps,
        vaccination_program_step: {
          create: steps,
        },
      },
    });
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
    return await prisma.vaccination_program.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = VaccProgService;
