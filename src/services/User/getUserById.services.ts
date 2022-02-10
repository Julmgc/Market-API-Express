import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";

export const userProfile = async (user_by_id: any, authenticated_user: any) => {
  try {
    const usersRepository = getCustomRepository(UserRepository);

    const user_id = await usersRepository.findOne({
      where: { id: user_by_id },
    });

    const authenticatedUser = await usersRepository.findOne({
      where: { id: authenticated_user },
    });

    if (!user_id) {
      throw new AppError("User Not Found", 400);
    }

    if (!authenticatedUser?.isAdm && user_by_id === authenticated_user) {
      return user_id;
    } else if (authenticatedUser?.isAdm) {
      return user_id;
    } else {
      throw new AppError("You can only see your own user information.", 401);
    }
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};

export default userProfile;
