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
    const user_id = req.user.id;

    const send_conde = new SendPasswordCodeService();
    const code = await send_conde.execute(user_id);

    return res
      .status(200)
      .json("Email with code to recover user's password was sent");
  } catch (err) {
    next(err);
  }
};
