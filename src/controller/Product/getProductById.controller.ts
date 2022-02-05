import { Request, Response, NextFunction } from "express";
import { productById } from "../../services/Product/getProductById.services";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product_by_id = req.params.id;
    const product = await productById(product_by_id);

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
