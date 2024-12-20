const prisma = require("#prismaClient");

class ChildService {
  static async getAllChilds() {
    return await prisma.child.findMany({
      take: 10,
      include: {
        vaccine_record: {
          orderBy: { step_rank: "asc" },
          include: { vaccine: true },
        },
        parent: true,
      },
    });
  }

  static async getAllChildByParentID(parent_id) {
    return await prisma.child.findMany({
      include: {
        vaccine_record: {
          orderBy: { step_rank: "asc" },
          include: { vaccine: true },
        },
        parent: true,
      },
      where: {
        parent_id: parseInt(parent_id),
      },
    });
  }

  static async getChildById(id) {
    try {
      return await prisma.child.findUnique({
        where: { id: parseInt(id) },
        include: { vaccine_record: true, parent: true },
      });
    } catch (err) {
      return null;
    }
  }

  static async findChildByName(name, parent_id) {
    try {
      return await prisma.child.findMany({
        where: {
          name: {
            contains: name,
          },
          parent_id: parseInt(parent_id),
        },
        include: {
          vaccine_record: {
            orderBy: { step_rank: "asc" },
            include: { vaccine: true },
          },
          parent: true,
        },
      });
    } catch (err) {
      return null;
    }
  }

  static async findChildByNameWithoutParentID(name) {
    try {
      return await prisma.child.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        include: {
          vaccine_record: {
            orderBy: { step_rank: "asc" },
            include: { vaccine: true },
          },
          parent: true,
        },
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
