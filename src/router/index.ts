import { userRouter } from "./user.router";
import { Express } from "express";
export const initializerRouter = (app: Express) => {
  app.use("/api", userRouter());
};
