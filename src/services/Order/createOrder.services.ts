import AppError from "../../errors/AppError";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import CartRepository from "../../repository/cart.repository";
import OrderRepository from "../../repository/orderRepository";
import SendOrderEmailService from "../Email/sendOrderEmail.services";
import OrderProduct from "../../entities/OrderProduct";

export const userOrder = async (user_id: any) => {
  try {
    const usersRepository = getCustomRepository(UserRepository);
    const cartRepository = getCustomRepository(CartRepository);
    const orderRepository = getCustomRepository(OrderRepository);
    const orderProductRepository = getRepository(OrderProduct);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const open_order = await orderRepository.findOne({
      where: [{ userId: user_id }, { Done: false }],
    });

    if (!open_order) {
      throw new AppError("Your cart is empty", 404);
    }
    open_order.Done = true;
    await orderRepository.save(open_order);

    const user_cart = cartRepository.create({ user: user });

    await cartRepository.save(user_cart);

    const sendOrderEmailService = new SendOrderEmailService();
    const total = open_order?.getTotal();

    if (!total) {
      throw new AppError("Your cart is empty", 404);
    }

    sendOrderEmailService.execute({
      name: user.name,
      email: user.email,
      orderTotal: total,
    });

    return open_order;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
