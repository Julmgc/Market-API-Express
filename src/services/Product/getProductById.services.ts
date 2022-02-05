import { getCustomRepository } from "typeorm";
import ProductRepository from "../../repository/product.repository";
import AppError from "../../errors/AppError";

export const productById = async (product_by_id: any) => {
  try {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = productsRepository.findOne({
      where: { id: product_by_id },
    });

    if (product === undefined) {
      throw new AppError("Product Not Found", 400);
    }

    return product;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};

export default productById;
