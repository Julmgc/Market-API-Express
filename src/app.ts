import express from "express";
import { initializerRouter } from "./router";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use(express.json());

initializerRouter(app);

app.use(errorHandler);
export default app;
