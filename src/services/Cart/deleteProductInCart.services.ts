import AppError from "../../errors/AppError";
import { getRepository, getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { CartProduct } from "../../entities";
import ProductRepository from "../../repository/product.repository";

export const deleteProductFromCart = async (
  product_id: any,
  authenticated_user_id: any
) => {
  try {
    const cartProductRepository = getRepository(CartProduct);

    const userRepository = await getCustomRepository(UserRepository);

    const productsRepository = getCustomRepository(ProductRepository);

    const product = productsRepository.findOne({
      where: { id: product_id },
    });

    if (product === undefined) {
      throw new AppError("Product Not Found", 400);
    }

    const authenticated_user = await userRepository.findOne({
      where: { id: authenticated_user_id },
    });

    const user_cart = authenticated_user?.cart;
    const user_cart_id = user_cart?.id;

    cartProductRepository.findOne({
      where: { cart: user_cart_id, product: product_id },
    });

    cartProductRepository.delete(product_id);

    return product_id;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
