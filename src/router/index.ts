import { userRouter } from "./user.router";
import { Express } from "express";
import { productRouter } from "./product.router";
export const initializerRouter = (app: Express) => {
  app.use("/api/client/", userRouter());
  app.use("/api/products/", productRouter());
};
