import express from "express";
import { initializerRouter } from "./router";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(errorHandler);
export default app;
