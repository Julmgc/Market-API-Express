import { getCustomRepository } from "typeorm";
import ProductRepository from "../../repository/product.repository";

export const listProducts = async () => {
  const productsRepository = getCustomRepository(ProductRepository);

  const products = productsRepository.find();

  return products;
};
