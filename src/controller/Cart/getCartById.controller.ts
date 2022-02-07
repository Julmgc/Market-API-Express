import { Request, Response, NextFunction } from "express";
import { userCart } from "../../services/Cart/getCartById.services";

export const UserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user.id;
    const cart_id = req.params.id;
    const cart = await userCart(user_id, cart_id);
    const total = cart.getSubtotal();
    const response = { cart: cart, total: total };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
