import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { userCreate } from "../controller/Product/createProduct.controller";
const router = Router();

export const productRouter = () => {
  router.post("/product", isAuthenticated, isAdm_middleware, userCreate);
  return router;
};
