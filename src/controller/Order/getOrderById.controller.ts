import { Request, Response, NextFunction } from "express";
import { userOrder } from "../../services/Order/getOrderById.services";

export const UserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user.id;
    const order_id = req.params.id;
    const order = await userOrder(user_id, order_id);
    const total = order.getTotal();
    const response = { Order: order, total: total };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
