import { userOrder } from "../../services/Order/createOrder.services";
import { NextFunction, Request, Response } from "express";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user.id;

    const makeAnOrder = await userOrder(user_id);
    const total = makeAnOrder?.getTotal();
    const response = { Order: makeAnOrder, total: total };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
