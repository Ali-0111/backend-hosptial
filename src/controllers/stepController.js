const StepService = require("#services/stepService");

class StepController {
  static async getAllSteps(req, res) {
    const { vaccination_program_id, step_rank } = req.query;
    let steps;

    try {
      if (vaccination_program_id) {
        steps = await StepService.getAllFilteredSteps(
          vaccination_program_id,
          step_rank
        );
      } else {
        steps = await StepService.getAllSteps();
      }
      res.status(200).json(steps);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getStepById(req, res) {
    try {
      const step = await StepService.getStepById(stepId);

      if (!step) {
        return res
          .status(404)
          .json({ error: `Step not found with id ${stepId}` });
      }
      res.status(200).json(step);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createStep(req, res) {
    try {
      const step = await StepService.createStep(req.body);
      res.status(201).json({ message: "Step created successfully", step });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateStep(req, res) {
    const stepId = req.params.id;
    try {
      const step = await StepService.updateStep(stepId, req.body);

      if (!step) {
        return res
          .status(404)
          .json({ error: `Step with id ${stepId} not found` });
      }
      res.status(200).json({ message: "Step updated successfully", step });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteStep(req, res) {
    try {
      const stepId = req.params.id;
      const step = await StepService.deleteStep(stepId);

      if (!step) {
        return res
          .status(404)
          .json({ error: `Step with ID ${stepId} not found` });
      }

      res
        .status(200)
        .json({ message: `Step with ID ${stepId} successfully deleted` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = StepController;
