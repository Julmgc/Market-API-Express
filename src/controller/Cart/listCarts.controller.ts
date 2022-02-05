import { listCarts } from "../../services/Cart/listCarts.services";
import { Request, Response } from "express";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await listCarts();

    res.send(carts);
  } catch (e: any) {
    res.status(401).json({ message: "Missing authorization headers" });
  }
};
