import { NextFunction, Request, Response } from "express";
import { putProductInCart } from "../../services/Cart/putProductInCart.services";

export const insertProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;

    const cart = await putProductInCart(productId, req.user.id);
    const total = cart?.getSubtotal();
    const response = { cart: cart, total: total };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
