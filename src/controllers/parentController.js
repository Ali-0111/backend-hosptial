const bcrypt = require("bcrypt");

const ParentService = require("#services/parentService");

class ParentController {
  static async getAllParents(req, res) {
    try {
      const parents = await ParentService.getAllParents();

      res.status(200).json(parents);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getParentById(req, res) {
    const parent_id = req.params.id;
    try {
      const parent = await ParentService.getParentById(parent_id);

      if (!parent) {
        return res
          .status(404)
          .json({ error: `Parent not found with id ${parent_id}` });
      }
      res.status(200).json(parent);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async findParentByName(req, res) {
    const name = req.params.family_name;

    try {
      const parent = await ParentService.findParentByName(name);

      if (!parent) {
        return res
          .status(404)
          .json({ error: `Parent not found with name ${name}` });
      }
      res.status(200).json(parent);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createParent(req, res) {
    try {
      const parent = await ParentService.createParent(req.body);

      const hashedPassword = await bcrypt.hash("asdf@123", 10);

      const data = {
        parent_id: parent.id,
        username: parent.phone,
        password: hashedPassword,
      };

      await ParentService.registerParent(data);

      res.status(201).json({ message: "Parent created successfully", parent });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateParent(req, res) {
    const parent_id = req.params.id;
    try {
      const parent = await ParentService.updateParent(parent_id, req.body);

      if (!parent) {
        return res
          .status(404)
          .json({ error: `Parent with id ${parent_id} not found` });
      }
      res.status(200).json({ message: "Parent updated successfully", parent });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteParent(req, res) {
    try {
      const parent_id = req.params.id;
      const parent = await ParentService.deleteParent(parent_id);
      if (!parent) {
        return res
          .status(404)
          .json({ error: `Parent with ID ${parent_id} not found` });
      }

      res
        .status(200)
        .json({ message: `Parent with ID ${parent_id} successfully deleted` });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", m: error.message });
    }
  }

  static async registerParent(req, res) {
    const { parent_id, username, password } = req.body;

    if (!username || !password || !parent_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      parent_id: parent_id,
      username: username,
      password: hashedPassword,
    };

    try {
      const parent = await ParentService.registerParent(data);
      res.status(201).json({ message: "Parent registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async logInParent(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const token_profile = await ParentService.logInParent({
        username,
        password,
      });

      if (!token_profile) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(201).json({ ...token_profile });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async updateParentSecurity(req, res) {
    const { new_password, new_username, old_password, parent_id } = req.body;

    if (!old_password || !parent_id) {
      return res
        .status(400)
        .json({ message: "In-valid data. Add required fields" });
    }

    try {
      const parent = await ParentService.updateParentSecurity({
        parent_id,
        old_password,
        new_password,
        new_username,
      });

      if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }

      res.status(200).json({ message: "Parent security updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}

module.exports = ParentController;
