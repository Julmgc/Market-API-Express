import { userRouter } from "./user.router";
import { Express } from "express";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
import { orderRouter } from "./order.router";
export const initializerRouter = (app: Express) => {
  app.use("/api/", userRouter());
  app.use("/api/", productRouter());
  app.use("/api/", cartRouter());
  app.use("/api/", orderRouter());
};
