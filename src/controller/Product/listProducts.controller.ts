import { listProducts } from "../../services/Product/listProducts.services";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await listProducts();

    res.send(products);
  } catch (e: any) {
    res.status(401).json({ message: "Missing authorization headers" });
  }
};
