import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { insertProductInCart } from "../controller/Cart/putProductInCart.controller";
import { UserCart } from "../controller/Cart/getCartById.controller";
import { getCarts } from "../controller/Cart/listCarts.controller";
// import { deleteProductInCart } from "../controller/Cart/deleteProductInCart.controller";

const router = Router();

export const cartRouter = () => {
  router.post("/addProduct", isAuthenticated, insertProductInCart);

  router.get("/cart", isAuthenticated, isAdm_middleware, getCarts);
  router.get("/cart/:id", isAuthenticated, UserCart);
  // router.delete("/cart/:product_id", isAuthenticated, deleteProductInCart);
  return router;
};
