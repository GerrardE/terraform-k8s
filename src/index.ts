import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import * as routers from "./logic";


const app: express.Application = express();

const port = process.env.PORT || 3000;

const address = `0.0.0.0:${port}`;

config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use("/", routers.baseRouter);
app.use("/metrics", routers.metricsRouter);

const index = app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});

export default index;
