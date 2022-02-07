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
    const { text, subject } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const authenticated_user = await userRepository.findOne({
      where: { id: req.user.id },
    });
    if (!authenticated_user) {
      throw new AppError("User not found", 404);
    }
    const email = authenticated_user.email;
    const name = authenticated_user.name;

    const sendEmailService = new SendEmailService();
    sendEmailService.execute({
      email,
      name,
      subject,
      text,
    });
    return res.status(200).json("Email was sent");
  } catch (err) {
    next(err);
  }
};
