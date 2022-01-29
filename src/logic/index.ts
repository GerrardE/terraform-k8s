import express from "express";
import baseRouter from "./base.logic";

const apiRouter = express.Router();

apiRouter.use("/", baseRouter);

export default apiRouter;
