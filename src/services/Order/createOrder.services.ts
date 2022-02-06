import AppError from "../../errors/AppError";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import CartRepository from "../../repository/cart.repository";
import OrderRepository from "../../repository/orderRepository";
import { Cart, CartProduct } from "../../entities";
import ProductRepository from "../../repository/product.repository";
export const userOrder = async (user_id: any) => {
  try {
    const usersRepository = getCustomRepository(UserRepository);
    const cartRepository = getCustomRepository(CartRepository);
    const orderRepository = getCustomRepository(OrderRepository);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    const open_order = await orderRepository.findOne({
      where: [{ userId: user_id }, { Done: false }],
    });

    const orderId = open_order?.id;
    const data = { Done: true };

    await orderRepository.update(`${orderId}`, data);
    const orderAfterUpdate = await orderRepository.findOne({
      where: [{ userId: user_id }],
    });

    const user_cart = cartRepository.create({ user: user });

    await cartRepository.save(user_cart);

    return orderAfterUpdate;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
