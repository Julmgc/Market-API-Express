import SendEmailService from "../../services/Email/sendEmail.services";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, subject, email } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const name = user.name;

    const sendEmailService = new SendEmailService();
    sendEmailService.execute({
      email,
      name,
      subject,
      text,
    });
    return res.status(201).json("Email was sent.");
  } catch (err) {
    next(err);
  }
};
