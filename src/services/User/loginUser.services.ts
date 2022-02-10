import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";
import { Response } from "express";

export const userLogin = async (
  email: string,
  password: string,
  res: Response
) => {
  try {
    const userRepository = getCustomRepository(UserRepository);

    const user1 = await userRepository.findByEmail(email);

    const user = await userRepository.findOne({
      where: { id: user1?.id },
      select: ["id", "name", "email", "createdOn", "password"],
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new AppError("Wrong email/password", 401);
    }
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
        expiresIn: "1d",
      });

      return token;
    }
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
