const prisma = require("#prismaClient");

class ChildService {
  static async getAllChilds() {
    return await prisma.child.findMany({
      take: 10
    });
  }

  static async getAllChildByNurseID(nurse_id) {
    return await prisma.child.findMany({
      take: 10,
      include: { vaccine_record: true},
      where: {
        nurse_id: parseInt(nurse_id)
      }
    });
  }

  static async getChildById(id) {
    try {
      return await prisma.child.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async findChildByName(name) {
    try {
      return await prisma.child.findMany(
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
