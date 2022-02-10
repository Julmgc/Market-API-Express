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
exports.deleteProductFromCart = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const entities_1 = require("../../entities");
const product_repository_1 = __importDefault(require("../../repository/product.repository"));
const cart_repository_1 = __importDefault(require("../../repository/cart.repository"));
const orderRepository_1 = __importDefault(require("../../repository/orderRepository"));
const OrderProduct_1 = __importDefault(require("../../entities/OrderProduct"));
const deleteProductFromCart = (product_id, authenticated_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartProductRepository = (0, typeorm_1.getRepository)(entities_1.CartProduct);
        const cartRepository = (0, typeorm_1.getCustomRepository)(cart_repository_1.default);
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const orderRepository = (0, typeorm_1.getCustomRepository)(orderRepository_1.default);
        const productsRepository = (0, typeorm_1.getCustomRepository)(product_repository_1.default);
        const orderProductRepository = (0, typeorm_1.getRepository)(OrderProduct_1.default);
        const product = yield productsRepository.findOne({
            where: { id: product_id },
        });
        if (product === undefined) {
            throw new AppError_1.default("Product Not Found", 400);
        }
        const authenticated_user = yield userRepository.findOne({
            where: { id: authenticated_user_id },
        });
        // DELETING PRODUCT FROM CART AND ORDER
        const cart = yield cartRepository.findOne({
            id: authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.cart.id,
        });
        if (cart === undefined) {
            throw new AppError_1.default("Cart Not Found", 404);
        }
        const cartProduct = yield cartProductRepository.findOne({
            where: { cartId: cart === null || cart === void 0 ? void 0 : cart.id, product: product_id },
        });
        if (!cartProduct) {
            throw new AppError_1.default(`You don't have product with id: ${product_id} in your cart`, 404);
        }
        const order = yield orderRepository.findOne({
            userId: authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.id,
        });
        if (order === undefined) {
            throw new AppError_1.default("Order Not Found", 404);
        }
        const orderProduct = yield orderProductRepository.findOne({
            where: { orderId: order === null || order === void 0 ? void 0 : order.id, product: product_id },
        });
        if (!orderProduct) {
            throw new AppError_1.default("You don't have this product in your cart", 404);
        }
        if (cartProduct) {
            if (cartProduct.quantity <= 1) {
                yield cartProductRepository.delete(cartProduct.id);
                yield orderProductRepository.delete(orderProduct.id);
                const cart = yield cartRepository.findOne({
                    id: authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.cart.id,
                });
                return cart;
            }
            cartProduct.quantity = cartProduct.quantity - 1;
            yield cartProductRepository.save(cartProduct);
            orderProduct.quantity = orderProduct.quantity - 1;
            yield orderProductRepository.save(orderProduct);
        }
        const cartAfterChanges = yield cartRepository.findOne({
            id: authenticated_user === null || authenticated_user === void 0 ? void 0 : authenticated_user.cart.id,
        });
        return cartAfterChanges;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.deleteProductFromCart = deleteProductFromCart;
