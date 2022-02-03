import { getCustomRepository } from "typeorm";
import bcrypt from "bcrypt";
import { UserData } from "../../types/userTypes";
import UserRepository from "../../repository/user.repository";
import { Response } from "express";

export const createUser = async (body: UserData, res: Response) => {
  const { name, email, password, isAdm } = body;

  const userRepository = getCustomRepository(UserRepository);

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await userRepository.create({
    name: name,
    email: email,
    password: hashedPassword,
    isAdm: isAdm,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  await userRepository.save(user);

  const returned_user = {
    uuid: user.id,
    createdOn: new Date(),
    updatedOn: new Date(),
    name: name,
    email: email,
    isAdm: isAdm,
  };

  return returned_user;
};
