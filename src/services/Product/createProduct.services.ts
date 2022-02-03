import { getCustomRepository } from "typeorm";
import { ProductData } from "../../types/productTypes";
import ProductRepository from "../../repository/product.repository";
import { Response } from "express";

export const createProduct = async (body: ProductData, res: Response) => {
  const { name, price, description } = body;

  const productRepository = getCustomRepository(ProductRepository);

  const product = await productRepository.create({
    name: name,
    price: price,
    description: description,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await productRepository.save(product);

  return product;
};
