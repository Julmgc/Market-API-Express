import SendEmailService from "./genericEmail.services";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

export const genericEmailToUser = async (user_info: any) => {
  try {
    const { text, subject, email } = user_info;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const name = user.name;

    const sendEmailService = new SendEmailService();

    const sendEmail = await sendEmailService.execute({
      email,
      name,
      subject,
      text,
    });

    return user.email;
  } catch (error) {
    throw new AppError((error as any).message, 401);
  }
};
