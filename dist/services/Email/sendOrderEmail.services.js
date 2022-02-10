"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
class SendOrderEmailService {
    execute({ email, orderTotal, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var mailer = nodemailer_1.default.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "68ea8a3d948603",
                        pass: "7ee5e88f5a1daa",
                    },
                });
                console.log("NODEMAILER");
                mailer.use("compile", (0, nodemailer_express_handlebars_1.default)({
                    viewEngine: {
                        partialsDir: path_1.default.resolve(__dirname, "..", "..", "email"),
                        defaultLayout: undefined,
                    },
                    viewPath: path_1.default.resolve(__dirname, "..", "..", "email"),
                }));
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
                    console.log("ERRO DO MAILER", info);
                    if (err) {
                        throw new AppError_1.default("Error while sending order email", 500);
                    }
                });
            }
            catch (error) {
                console.log("ERROR", error);
                throw new AppError_1.default(error.message, 401);
            }
        });
    }
}
exports.default = SendOrderEmailService;
