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
const typeorm_1 = require("typeorm");
const orderRepository_1 = __importDefault(require("../../repository/orderRepository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const userOrder = (user_id, order_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderRepository = (0, typeorm_1.getCustomRepository)(orderRepository_1.default);
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const authenticated_user = yield userRepository.findOne({
            where: { id: user_id },
        });
        const order = yield orderRepository.findOne({ id: order_id });
        if (order === undefined) {
            throw new AppError_1.default("Order Not Found", 400);
        }
        if (authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.isAdm) {
            return order;
        }
        if (order.userId !== user_id) {
            throw new AppError_1.default("You can only see your own order", 400);
        }
        return order;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 404);
    }
});
exports.userOrder = userOrder;
