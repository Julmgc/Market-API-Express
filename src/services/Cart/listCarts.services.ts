import { getCustomRepository } from "typeorm";
import CartRepository from "../../repository/cart.repository";

export const listCarts = async () => {
  const cartRepository = getCustomRepository(CartRepository);

  const carts = cartRepository.find();

  return carts;
};
