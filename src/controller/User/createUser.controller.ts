import { NextFunction, Request, Response } from "express";

import { createUser } from "../../services/User/createUser.services";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";

export const userCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const duplicatedEmail = await userRepository.findByEmail(email);

    if (duplicatedEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await createUser(req.body, res);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
