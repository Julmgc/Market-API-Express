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
exports.changeUserPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Code_1 = __importDefault(require("../../entities/Code"));
const typeorm_1 = require("typeorm");
const changeUserPassword = (email, code, password, confirmation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeRepository = (0, typeorm_1.getRepository)(Code_1.default);
        const checkCode = yield codeRepository.findOne({ where: { code: code } });
        const usersRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const user = yield usersRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw new AppError_1.default("User not found", 404);
        }
        if (!checkCode) {
            throw new AppError_1.default("Invalid code.", 401);
        }
        if (password !== confirmation) {
            throw new AppError_1.default("Password and confirmation aren't the same", 401);
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        user.password = hashedPassword;
        yield usersRepository.save(user);
        yield codeRepository.delete(checkCode);
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.changeUserPassword = changeUserPassword;
