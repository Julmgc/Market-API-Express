import AppError from "../../errors/AppError";
import { getRepository, getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { CartProduct } from "../../entities";
import ProductRepository from "../../repository/product.repository";
import CartRepository from "../../repository/cart.repository";
import OrderRepository from "../../repository/orderRepository";
import OrderProduct from "../../entities/OrderProduct";

export const deleteProductFromCart = async (
  product_id: any,
  authenticated_user_id: any
) => {
  try {
    const cartProductRepository = getRepository(CartProduct);
    const cartRepository = getCustomRepository(CartRepository);
    const userRepository = getCustomRepository(UserRepository);
    const orderRepository = getCustomRepository(OrderRepository);
    const productsRepository = getCustomRepository(ProductRepository);
    const orderProductRepository = getRepository(OrderProduct);

    const product = await productsRepository.findOne({
      where: { id: product_id },
    });

    if (product === undefined) {
      throw new AppError("Product Not Found", 400);
    }

    const authenticated_user = await userRepository.findOne({
      where: { id: authenticated_user_id },
    });

    // DELETING PRODUCT FROM CART AND ORDER

    const cart = await cartRepository.findOne({
      id: authenticated_user?.cart.id,
    });

    if (cart === undefined) {
      throw new AppError("Cart Not Found", 404);
    }

    const cartProduct = await cartProductRepository.findOne({
      where: { cartId: cart?.id, product: product_id },
    });
    if (!cartProduct) {
      throw new AppError(
        `You don't have product with id: ${product_id} in your cart`,
        404
      );
    }
    const order = await orderRepository.findOne({
      userId: authenticated_user?.id,
    });

    if (order === undefined) {
      throw new AppError("Order Not Found", 404);
    }

    const orderProduct = await orderProductRepository.findOne({
      where: { orderId: order?.id, product: product_id },
    });
    if (!orderProduct) {
      throw new AppError("You don't have this product in your cart", 404);
    }

    if (cartProduct) {
      if (cartProduct.quantity <= 1) {
        await cartProductRepository.delete(cartProduct.id);
        await orderProductRepository.delete(orderProduct.id);
        const cart = await cartRepository.findOne({
          id: authenticated_user?.cart.id,
        });
        return cart;
      }
      cartProduct.quantity = cartProduct.quantity - 1;
      await cartProductRepository.save(cartProduct);
      orderProduct.quantity = orderProduct.quantity - 1;
      await orderProductRepository.save(orderProduct);
    }

    const cartAfterChanges = await cartRepository.findOne({
      id: authenticated_user?.cart.id,
    });
    return cartAfterChanges;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
