import express from "express";
import bodyParser from "body-parser";
import debug from "debug";
import logger from "morgan";
import { config } from "dotenv";
import cors from "cors";
import apis from "./logic/index";

const app: express.Application = express();

const port = process.env.PORT || 3000;

const address = `0.0.0.0:${port}`;

const debugged = debug("index");

config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(logger("dev"));

app.use("/api/v1", apis);

const index = app.listen(port, () => {
  debugged(`starting app on: ${address}`);
  console.log(`starting app on: ${address}`);
});

export default index;
