const prisma = require("#prismaClient");

class ChildService {
  static async getAllChilds() {
    return await prisma.child.findMany();
  }

  static async getChildById(id) {
    try {
      return await prisma.child.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async createChild(data) {
    return await prisma.child.create({ data });
  }

  static async updateChild(id, data) {
    try {
      return await prisma.child.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteChild(id) {
    try {
      return await prisma.child.delete({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }
}

module.exports = ChildService;
