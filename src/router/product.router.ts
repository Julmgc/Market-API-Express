import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { userCreate } from "../controller/Product/createProduct.controller";
import { getProductById } from "../controller/Product/getProductById.controller";
import { getProducts } from "../controller/Product/listProducts.controller";
import { validate } from "../Schema/schema.validation";
import { productRegisterSchema } from "../Schema/schemas";
const router = Router();

export const productRouter = () => {
  router.post(
    "/product",
    validate(productRegisterSchema),
    isAuthenticated,
    isAdm_middleware,
    userCreate
  );
  router.get("/product/:id", getProductById);
  router.get("/product", getProducts);

  return router;
};
