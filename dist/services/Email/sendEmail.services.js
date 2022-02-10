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
exports.genericEmailToUser = void 0;
const genericEmail_services_1 = __importDefault(require("./genericEmail.services"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const genericEmailToUser = (user_info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, subject, email } = user_info;
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const user = yield userRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw new AppError_1.default("User not found", 404);
        }
        const name = user.name;
        const sendEmailService = new genericEmail_services_1.default();
        const sendEmail = yield sendEmailService.execute({
            email,
            name,
            subject,
            text,
        });
        return user.email;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.genericEmailToUser = genericEmailToUser;
