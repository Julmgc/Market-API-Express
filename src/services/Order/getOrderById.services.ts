import { getCustomRepository } from "typeorm";
import OrderRepository from "../../repository/orderRepository";
import AppError from "../../errors/AppError";
import UserRepository from "../../repository/user.repository";

export const userOrder = async (user_id: any, order_id: any) => {
  try {
    const orderRepository = getCustomRepository(OrderRepository);
    const userRepository = getCustomRepository(UserRepository);
    const authenticated_user = await userRepository.findOne({
      where: { id: user_id },
    });

    const order = await orderRepository.findOne({ id: order_id });

    if (order === undefined) {
      throw new AppError("Order Not Found", 400);
    }

    if (authenticated_user?.isAdm) {
      return order;
    }

    if (order.userId !== user_id) {
      throw new AppError("You can only see your own order", 400);
    }

    return order;
  } catch (error) {
    throw new AppError((error as any).message, 404);
  }
};
