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

    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
