import express from "express";
import { initializerRouter } from "./router";
import "reflect-metadata";
import { connectDatabase } from "./database";

connectDatabase();

const app = express();

app.use(express.json());

initializerRouter(app);

app.get("/get", (req, res) => {
  res.send({ message: "OK" });
});

export default app;
