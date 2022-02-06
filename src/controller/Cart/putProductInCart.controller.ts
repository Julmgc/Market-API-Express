import { NextFunction, Request, Response } from "express";
import { putProductInCart } from "../../services/Cart/putProductInCart.services";

export const insertProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;

    const cart = await putProductInCart(product, req.user.id);

    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
