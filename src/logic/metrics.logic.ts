import express, { Response, Request } from "express";
import promClient from "prom-client";

const metricsRouter = express.Router();

/**
 * Metrics Logic
 * @async
 * @class MetricsLogic
 */
class MetricsLogic {
  /**
   * @static
   * @param {*} _req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof MetricsLogic
   */
  static async create(_req: Request, res: Response): Promise<Response> {
    try {
      // Create a Registry which registers the metrics
      const register = new promClient.Registry();

      // Add default label for all metrics
      register.setDefaultLabels({
        app: "terraform-k8s",
      });

      // Enable the collection of default metrics
      promClient.collectDefaultMetrics({ register });

      res.setHeader("Content-Type", register.contentType);

      const payload = await register.metrics();

      return res.send(payload);
    } catch (error) {
      return res.send(error);
    }
  }
}

metricsRouter.get("/", MetricsLogic.create);

export default metricsRouter;
