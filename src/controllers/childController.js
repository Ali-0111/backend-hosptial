const ChildService = require("#services/childService");

class ChildController {
  static async getAllChilds(req, res) {
    try {
      const children = await ChildService.getAllChilds();
      res.status(200).json(children);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getChildById(req, res) {
    const childId = req.params.id;
    try {
      const child = await ChildService.getChildById(childId);

      if (!child) {
        return res
          .status(404)
          .json({ error: `Child not found with id ${childId}` });
      }
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createChild(req, res) {
    try {
      const child = await ChildService.createChild(req.body);
      res.status(201).json({ message: "Child created successfully", child });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateChild(req, res) {
    const childId = req.params.id;
    try {
      const child = await ChildService.updateChild(childId, req.body);

      if (!child) {
        return res
          .status(404)
          .json({ error: `Child with id ${childId} not found` });
      }
      res.status(200).json({ message: "Child updated successfully", child });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteChild(req, res) {
    try {
      const childId = req.params.id;
      const child = await ChildService.deleteChild(childId);

      if (!child) {
        return res
          .status(404)
          .json({ error: `Child with ID ${childId} not found` });
      }

      res
        .status(200)
        .json({ message: `Child with ID ${childId} successfully deleted` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = ChildController;
