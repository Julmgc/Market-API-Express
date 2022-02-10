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
exports.userProfile = void 0;
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const userProfile = (user_by_id, authenticated_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const user_id = yield usersRepository.findOne({
            where: { id: user_by_id },
        });
        const authenticatedUser = yield usersRepository.findOne({
            where: { id: authenticated_user },
        });
        if (!user_id) {
            throw new AppError_1.default("User Not Found", 400);
        }
        if (!(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.isAdm) && user_by_id === authenticated_user) {
            return user_id;
        }
        else if (authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.isAdm) {
            return user_id;
        }
        else {
            throw new AppError_1.default("You can only see your own user information.", 401);
        }
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.userProfile = userProfile;
exports.default = exports.userProfile;
