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
exports.userLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const userLogin = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const user1 = yield userRepository.findByEmail(email);
        const user = yield userRepository.findOne({
            where: { id: user1 === null || user1 === void 0 ? void 0 : user1.id },
            select: ["id", "name", "email", "createdOn", "password"],
        });
        if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
            throw new AppError_1.default("Wrong email/password", 401);
        }
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: "1d",
            });
            return token;
        }
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.userLogin = userLogin;
