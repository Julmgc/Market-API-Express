import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { insertProductInCart } from "../controller/Cart/putProductInCart.controller";
import { UserCart } from "../controller/Cart/getCartById.controller";
import { getCarts } from "../controller/Cart/listCarts.controller";
import { deleteCartProduct } from "../controller/Cart/deleteProductInCart.controller";
import { validate } from "../Schema/schema.validation";
import { putProductInCartRegisterSchema } from "../Schema/schemas";
const router = Router();

export const cartRouter = () => {
  router.post(
    "/cart",
    validate(putProductInCartRegisterSchema),
    isAuthenticated,
    insertProductInCart
  );
  router.get("/cart", isAuthenticated, isAdm_middleware, getCarts);
  router.get("/cart/:id", isAuthenticated, UserCart);
  router.delete("/cart/:product_id", isAuthenticated, deleteCartProduct);
  return router;
};
