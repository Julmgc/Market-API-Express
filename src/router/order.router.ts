import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { createOrder } from "../controller/Order/createOrder.controller";
import { UserOrder } from "../controller/Order/getOrderById.controller";
import { getOrders } from "../controller/Order/listOrders.controller";

const router = Router();

export const orderRouter = () => {
  router.post("/buy", isAuthenticated, createOrder);
  router.get("/buy", isAuthenticated, isAdm_middleware, getOrders);
  router.get("/buy/:id", isAuthenticated, UserOrder);
  return router;
};
