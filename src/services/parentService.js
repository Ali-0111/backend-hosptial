const prisma = require("#prismaClient");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SECRET_KEY
const SECRET_KEY = process.env.SECRET_KEY;
class ParentService {
  static async getAllParents() {
    return await prisma.parent.findMany({ take: 10 });
  }

  static async getParentById(id) {
    try {
      return await prisma.parent.findUnique({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async findParentByName(name) {
    try {
      return await prisma.parent.findMany({
        where: {
          family_name: {
            contains: name,
          },
        },
      });
    } catch (err) {
      return null;
    }
  }

  static async createParent(data) {
    return await prisma.parent.create({ data });
  }

  static async updateParent(id, data) {
    try {
      return await prisma.parent.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (err) {
      return null;
    }
  }

  static async deleteParent(id) {
    try {
      return await prisma.parent.delete({ where: { id: parseInt(id) } });
    } catch (err) {
      return null;
    }
  }

  static async registerParent(data) {
    return await prisma.parent_credentials.create({ data });
  }

  static async logInParent(data) {
    const { username, password } = data;

    const rec = await prisma.parent_credentials.findUnique({
      where: { username },
      include: { parent: true },
    });

    if (!rec) {
      return null;
    }

    const checkPassword = await bcrypt.compare(password, rec.password);

    if (!checkPassword) {
      return null;
    }

    const token = jwt.sign({ username: rec.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    delete rec.password;

    return { profile: rec, token };
  }

  static async updateParentSecurity(data) {
    const { parent_id, old_password, new_username, new_password } = data;
    try {
      const parentRec = await prisma.parent_credentials.findUnique({
        where: { parent_id: parent_id },
      });

      if (!parentRec) {
        throw new Error("Parent not found");
      }

      // Verify the old password
      const isPasswordCorrect = await bcrypt.compare(
        old_password,
        parentRec.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect old password");
      }

      // Prepare the update data object
      const updateData = {};

      if (new_username) {
        updateData.username = new_username;
      }

      if (new_password) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        updateData.password = hashedPassword;
      }

      // Update the parent's credentials
      const updatedParent = await prisma.parent_credentials.update({
        where: { parent_id: parent_id },
        data: updateData,
      });

      return updatedParent;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ParentService;
