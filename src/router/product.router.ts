import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { userCreate } from "../controller/Product/createProduct.controller";
import { getProductById } from "../controller/Product/getProductById.controller";
import { getProducts } from "../controller/Product/listProducts.controller";
const router = Router();

export const productRouter = () => {
  router.post("/product", isAuthenticated, isAdm_middleware, userCreate);
  router.get("/product/:id", getProductById);
  router.get("/product", getProducts);

  return router;
};
