import bcrypt from "bcrypt";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";
import Code from "../../entities/Code";
import { getCustomRepository, getRepository } from "typeorm";

export const changeUserPassword = async (
  user_id: string,
  code: string,
  password: string,
  confirmation: string
) => {
  try {
    const codeRepository = getRepository(Code);
    const checkCode = await codeRepository.findOne({ where: { code: code } });

    if (!checkCode) {
      throw new AppError("Invalid code.", 401);
    }

    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (password !== confirmation) {
      throw new AppError("Password and confirmation aren't the same", 401);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;

    await usersRepository.save(user);

    await codeRepository.delete(checkCode);
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
