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
exports.userOrder = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const cart_repository_1 = __importDefault(require("../../repository/cart.repository"));
const orderRepository_1 = __importDefault(require("../../repository/orderRepository"));
const sendOrderEmail_services_1 = __importDefault(require("../Email/sendOrderEmail.services"));
const OrderProduct_1 = __importDefault(require("../../entities/OrderProduct"));
const userOrder = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const cartRepository = (0, typeorm_1.getCustomRepository)(cart_repository_1.default);
        const orderRepository = (0, typeorm_1.getCustomRepository)(orderRepository_1.default);
        const orderProductRepository = (0, typeorm_1.getRepository)(OrderProduct_1.default);
        const user = yield usersRepository.findOne({
            where: { id: user_id },
        });
        if (!user) {
            throw new AppError_1.default("User not found", 404);
        }
        const open_order = yield orderRepository.findOne({
            where: [{ userId: user_id }, { Done: false }],
        });
        if (!open_order) {
            throw new AppError_1.default("Your cart is empty", 404);
        }
        open_order.Done = true;
        yield orderRepository.save(open_order);
        const user_cart = cartRepository.create({ user: user });
        yield cartRepository.save(user_cart);
        const sendOrderEmailService = new sendOrderEmail_services_1.default();
        const total = open_order === null || open_order === void 0 ? void 0 : open_order.getTotal();
        if (!total) {
            throw new AppError_1.default("Your cart is empty", 404);
        }
        yield sendOrderEmailService.execute({
            name: user.name,
            email: user.email,
            orderTotal: total,
        });
        return open_order;
    }
    catch (error) {
        console.log("ERROR", error);
        throw new AppError_1.default(error.message, 401);
    }
});
exports.userOrder = userOrder;
