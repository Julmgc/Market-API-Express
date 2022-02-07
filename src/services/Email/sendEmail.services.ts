import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";

interface Request {
  email: string;
  text: Text;
  name: string;
  subject: string;
}

export default class SendEmailService {
  public async execute({ email, text, name, subject }: Request): Promise<void> {
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
      subject: subject,
      template: "sendGenericemail",
      context: {
        name,
        text,
      },
    };

    mailer.sendMail(mail, (err, info) => {
      if (err) {
        throw new AppError("Error while sending  email", 500);
      }
    });
  }
}
