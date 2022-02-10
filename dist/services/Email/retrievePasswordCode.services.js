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
const Code_1 = __importDefault(require("../../entities/Code"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const uuid_1 = require("uuid");
class SendPasswordCodeService {
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
                const codeRepository = (0, typeorm_1.getRepository)(Code_1.default);
                const user = yield usersRepository.findOne({
                    where: { email: email },
                });
                if (!user) {
                    throw new AppError_1.default("User not found", 404);
                }
                const code = yield codeRepository.findOne({
                    where: {
                        user: user,
                    },
                });
                if (code) {
                    yield codeRepository.delete(code.id);
                }
                const newCode = codeRepository.create({
                    user_Id: user.id,
                    code: (0, uuid_1.v4)(),
                });
                yield codeRepository.save(newCode);
                const name = user.name;
                var mailer = nodemailer_1.default.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "68ea8a3d948603",
                        pass: "7ee5e88f5a1daa",
                    },
                });
                mailer.use("compile", (0, nodemailer_express_handlebars_1.default)({
                    viewEngine: {
                        partialsDir: path_1.default.resolve(__dirname, "..", "..", "email"),
                        defaultLayout: undefined,
                    },
                    viewPath: path_1.default.resolve(__dirname, "..", "..", "email"),
                }));
                const mail = {
                    from: "market_don't_answer@market.com",
                    to: user.email,
                    subject: "Retrieve password",
                    template: "retrievePassword",
                    context: {
                        name,
                        user_code: newCode.code,
                    },
                };
                mailer.sendMail(mail, (err, info) => {
                    if (err) {
                        throw new AppError_1.default(err.message, 401);
                    }
                });
            }
            catch (err) {
                throw new AppError_1.default(err.message, 401);
            }
        });
    }
}
exports.default = SendPasswordCodeService;
