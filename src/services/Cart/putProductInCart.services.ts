import CartRepository from "../../repository/cart.repository";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { CartProduct } from "../../entities";
import ProductRepository from "../../repository/product.repository";
import OrderRepository from "../../repository/orderRepository";
import AppError from "../../errors/AppError";
import OrderProduct from "../../entities/OrderProduct";

export const putProductInCart = async (product_id: string, user_id: string) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const cartRepository = getCustomRepository(CartRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const cartProductRepository = getRepository(CartProduct);
    const orderRepository = getCustomRepository(OrderRepository);
    const orderProductRepository = getRepository(OrderProduct);

    const user = await userRepository.findOne({ where: { id: user_id } });

    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new AppError("Product id doesn't exist", 404);
    }

    //PUTTING PRODUCT IN CART
    const cart = await cartRepository.findOne({ id: user?.cart.id });

    const productToCart = cartProductRepository.create({
      cart: { id: cart?.id },
      product: { id: product?.id },
    });

    await cartProductRepository.save(productToCart);
    const cart_1 = await cartRepository.findOne({ id: user?.cart.id });

    const open_order = await orderRepository.findOne({
      where: [{ userId: user_id, Done: false }],
    });

    if (!open_order) {
      const createOrder = orderRepository.create({
        userId: user_id,
        Done: false,
      });

      await orderRepository.save(createOrder);

      const find_open_order = await orderRepository.findOne({
        where: [{ userId: user_id }, { Done: false }],
      });

      const productToOrder = orderProductRepository.create({
        orderId: find_open_order?.id,
        product: { id: product?.id },
      });
      await orderProductRepository.save(productToOrder);

      return cart_1;
    }
    const productToOrder = orderProductRepository.create({
      order: { id: open_order?.id },
      product: { id: product?.id },
    });
    await orderProductRepository.save(productToOrder);

    return cart_1;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
