import { getCustomRepository } from "typeorm";
import CartRepository from "../../repository/cart.repository";
import AppError from "../../errors/AppError";
import UserRepository from "../../repository/user.repository";
export const userCart = async (user_id: any, cart_id_params: any) => {
  try {
    const cartRepository = getCustomRepository(CartRepository);
    const userRepository = getCustomRepository(UserRepository);
    const authenticated_user = await userRepository.findOne({
      where: { id: user_id },
    });

    const cart = await cartRepository.findOne({ id: cart_id_params });

    if (cart === undefined) {
      throw new AppError("Cart Not Found", 404);
    }

    if (authenticated_user?.isAdm) {
      return cart;
    }

    if (authenticated_user?.cart.id !== cart.id) {
      throw new AppError("You can only see your own cart", 401);
    }

    return cart;
  } catch (error) {
    throw new AppError((error as any).message, 404);
  }
};

export default userCart;
