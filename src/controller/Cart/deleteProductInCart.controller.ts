import { NextFunction, Response, Request } from "express";
import { deleteProductFromCart } from "../../services/Cart/deleteProductInCart.services";

export const deleteCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product_id = req.params.product_id;
    const authenticated_user_id = req.user.id;
    const updatedCart = await deleteProductFromCart(
      product_id,
      authenticated_user_id
    );

    return res.status(200).json(updatedCart?.products);
  } catch (error) {
    next(error);
  }
};
