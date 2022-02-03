import { NextFunction, Request, Response } from "express";

import { createProduct } from "../../services/Product/createProduct.services";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../../repository/product.repository";

export const userCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const productRepository = getCustomRepository(ProductRepository);

    const product = await createProduct(req.body, res);

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
