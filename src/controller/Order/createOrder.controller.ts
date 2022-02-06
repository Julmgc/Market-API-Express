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
    return res.status(200).json(makeAnOrder);
  } catch (error) {
    next(error);
  }
};
