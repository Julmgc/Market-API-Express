import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { genericEmailToUser } from "../../services/Email/sendEmail.services";
export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sendEmail = await genericEmailToUser(req.body);

    return res.status(201).json(sendEmail);
  } catch (err) {
    next(err);
  }
};
