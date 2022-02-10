import bcrypt from "bcrypt";
import { UserData } from "../../types/userTypes";
import UserRepository from "../../repository/user.repository";
import { Response } from "express";
import CartRepository from "../../repository/cart.repository";
import { getCustomRepository } from "typeorm";

export const createUser = async (body: UserData, res: Response) => {
  const { name, email, password, isAdm } = body;

  const userRepository = getCustomRepository(UserRepository);
  const cartRepository = getCustomRepository(CartRepository);

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = userRepository.create({
    name: name,
    email: email,
    password: hashedPassword,
    isAdm: isAdm,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  await userRepository.save(user);

  const user_cart = cartRepository.create({ user: user });

  await cartRepository.save(user_cart);

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
