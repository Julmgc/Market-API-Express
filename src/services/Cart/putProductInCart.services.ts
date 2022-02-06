import CartRepository from "../../repository/cart.repository";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { CartProduct } from "../../entities";
import ProductRepository from "../../repository/product.repository";
import AppError from "../../errors/AppError";

export const putProductInCart = async (product_id: string, user_id: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const cartRepository = getCustomRepository(CartRepository);
  const productRepository = getCustomRepository(ProductRepository);
  const cartProductRepository = getRepository(CartProduct);

  const user = await userRepository.findOne({ where: { id: user_id } });

  const product = await productRepository.findOne({
    where: { id: product_id },
  });

  if (!product) {
    throw new AppError("Product id doesn't exist", 404);
  }

  const cart = await cartRepository.findOne({ id: user?.cart.id });

  const productToCart = await cartProductRepository.create({
    cart: { id: cart?.id },
    product: { id: product?.id },
  });

  await cartProductRepository.save(productToCart);
  const cart_1 = await cartRepository.findOne({ id: user?.cart.id });

  return cart_1;
};
