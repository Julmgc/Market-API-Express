import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";

export const listUsers = async () => {
  const usersRepository = getCustomRepository(UserRepository);

  const users = usersRepository.find();

  return users;
};
