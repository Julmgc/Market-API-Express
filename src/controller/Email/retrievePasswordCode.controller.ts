import { NextFunction, Response, Request } from "express-serve-static-core";

import SendEmailService from "../../services/Email/sendEmail.services";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";
import SendPasswordCodeService from "../../services/Email/retrievePasswordCode.services";

export const retrievePasswordCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const send_conde = new SendPasswordCodeService();
    const code = await send_conde.execute(email);

    return res
      .status(200)
      .json("Email with code to recover your password was sent");
  } catch (err) {
    next(err);
  }
};
