import { getCustomRepository } from "typeorm";
import OrderRepository from "../../repository/orderRepository";

export const listOrders = async () => {
  const orderRepository = getCustomRepository(OrderRepository);

  const orders = orderRepository.find();

  return orders;
};
