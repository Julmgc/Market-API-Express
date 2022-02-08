import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";

export const userProfile = async (user_by_id: any, authenticated_user: any) => {
  try {
    const usersRepository = getCustomRepository(UserRepository);
    const user_id = usersRepository.findOne({ where: { id: user_by_id } });
    const userAdm = await usersRepository.findOne({
      where: { id: authenticated_user },
    });

    if (user_id === undefined) {
      throw new AppError("User Not Found", 400);
    }

    if (!userAdm?.isAdm && user_by_id === authenticated_user) {
      return user_id;
    } else if (userAdm?.isAdm) {
      const users = usersRepository.find();
      return users;
    } else {
      throw new AppError("You can only see your own user information.", 401);
    }
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};

export default userProfile;
