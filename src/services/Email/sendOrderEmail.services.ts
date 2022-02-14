import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";

interface Request {
  email: string;
  orderTotal: number;
  name: string;
}

export default class SendOrderEmailService {
  public async execute({ email, orderTotal, name }: Request): Promise<void> {
    try {
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
        subject: "Order description",
        template: "email",
        context: {
          name,
          orderTotal,
        },
      };
      mailer.sendMail(mail, (err, info) => {
        if (err) {
          throw new AppError("Error while sending order email", 500);
        }
      });
    } catch (error) {
      throw new AppError((error as any).message, 401);
    }
  }
}
