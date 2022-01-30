import express, { Response, Request } from "express";
import { statusCode } from "../domain/enums/statusCode.enum";
import { createResponse } from "../factory/response.factory";

const baseRouter = express.Router();

/**
 * Base Logic
 * @async
 * @class BaseLogic
 */
class BaseLogic {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof BaseLogic
   */
  static async create(req: Request, res: Response): Promise<Response> {
    const payload = createResponse({
      statusCode: statusCode.ok,
      headers: req.headers,
      body: {
        response:
          "Welcome to the terraform-k8s API, here are the details of your request:",
        headers: req.headers,
        method: req.method,
        body: req.body,
      },
    });
    try {
      return res.status(statusCode.ok).json(payload);
    } catch (error) {
      return res.status(statusCode.badrequest).json(payload);
    }
  }
}

baseRouter.get("/", BaseLogic.create);
baseRouter.post("/", BaseLogic.create);

export default baseRouter;
