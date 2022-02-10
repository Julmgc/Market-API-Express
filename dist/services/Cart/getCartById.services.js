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
exports.userCart = void 0;
const typeorm_1 = require("typeorm");
const cart_repository_1 = __importDefault(require("../../repository/cart.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const userCart = (user_id, cart_id_params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartRepository = (0, typeorm_1.getCustomRepository)(cart_repository_1.default);
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const authenticated_user = yield userRepository.findOne({
            where: { id: user_id },
        });
        const cart = yield cartRepository.findOne({ id: cart_id_params });
        if (cart === undefined) {
            throw new AppError_1.default("Cart Not Found", 404);
        }
        if (authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.isAdm) {
            return cart;
        }
        if ((authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.cart.id) !== cart.id) {
            throw new AppError_1.default("You can only see your own cart", 401);
        }
        return cart;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 404);
    }
});
exports.userCart = userCart;
exports.default = exports.userCart;
