import express from "express";
import { initializerRouter } from "./router";
import "reflect-metadata";
import { connectDatabase } from "./database";
import { errorHandler } from "./middlewares/error.middleware";

connectDatabase();

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(errorHandler);
export default app;
