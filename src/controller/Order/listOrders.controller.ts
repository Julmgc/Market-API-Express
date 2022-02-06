import { listOrders } from "../../services/Order/listOrder.services";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const carts = await listOrders();

    res.send(carts);
  } catch (e: any) {
    res.status(401).json({ message: "Missing authorization headers" });
  }
};
