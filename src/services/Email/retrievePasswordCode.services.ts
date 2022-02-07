import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";
import Code from "../../entities/Code";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

// interface Request {
//   email: string;
// }

export default class SendPasswordCodeService {
  public async execute(email: any): Promise<void> {
    try {
      const usersRepository = getCustomRepository(UserRepository);

      const codeRepository = getRepository(Code);

      const user = await usersRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new AppError("User not found", 404);
      }
      const user_id = user.id;
      console.log(user_id);
      // CRIAR E ASSOCIAR NEW CODE COM O USER
      const code = await codeRepository.findOne({
        where: {
          user: user,
        },
      });

      if (code) {
        await codeRepository.delete(code.id);
      }

      const newCode = codeRepository.create({
        user_Id: user.id,
        code: uuidv4(),
      });

      await codeRepository.save(newCode);

      const name = user.name;

      var mailer = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "68ea8a3d948603",
          pass: "7ee5e88f5a1daa",
        },
      });

      mailer.use(
        "compile",
        hbs({
          viewEngine: {
            partialsDir: path.resolve(__dirname, "..", "..", "email"),
            defaultLayout: undefined,
          },
          viewPath: path.resolve(__dirname, "..", "..", "email"),
        })
      );
      const mail = {
        from: "market_don't_answer@market.com",
        to: email,
        subject: "Retrieve password",
        template: "retrievePassword",
        context: {
          name,
          user_code: newCode.code,
        },
      };

      mailer.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
          throw new AppError((err as any).message, 401);
        }
      });
    } catch (err) {
      throw new AppError((err as any).message, 401);
    }
  }
}
