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
exports.putProductInCart = void 0;
const cart_repository_1 = __importDefault(require("../../repository/cart.repository"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const entities_1 = require("../../entities");
const product_repository_1 = __importDefault(require("../../repository/product.repository"));
const orderRepository_1 = __importDefault(require("../../repository/orderRepository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const OrderProduct_1 = __importDefault(require("../../entities/OrderProduct"));
const putProductInCart = (product_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const cartRepository = (0, typeorm_1.getCustomRepository)(cart_repository_1.default);
        const productRepository = (0, typeorm_1.getCustomRepository)(product_repository_1.default);
        const cartProductRepository = (0, typeorm_1.getRepository)(entities_1.CartProduct);
        const orderRepository = (0, typeorm_1.getCustomRepository)(orderRepository_1.default);
        const orderProductRepository = (0, typeorm_1.getRepository)(OrderProduct_1.default);
        const user = yield userRepository.findOne({ where: { id: user_id } });
        const product = yield productRepository.findOne({
            where: { id: product_id },
        });
        if (!product) {
            throw new AppError_1.default("Product doesn't exist", 404);
        }
        const cart = yield cartRepository.findOne({ id: user === null || user === void 0 ? void 0 : user.cart.id });
        const cartProduct = yield cartProductRepository.findOne({
            where: { cartId: cart === null || cart === void 0 ? void 0 : cart.id, product: product_id },
        });
        if (!cartProduct) {
            const productToCart = cartProductRepository.create({
                cartId: cart === null || cart === void 0 ? void 0 : cart.id,
                product: { id: product === null || product === void 0 ? void 0 : product.id },
                quantity: 1,
            });
            yield cartProductRepository.save(productToCart);
        }
        if (cartProduct) {
            cartProduct.quantity = cartProduct.quantity + 1;
            yield cartProductRepository.save(cartProduct);
        }
        const cart_1 = yield cartRepository.findOne({ id: user === null || user === void 0 ? void 0 : user.cart.id });
        const open_order = yield orderRepository.findOne({
            where: [{ userId: user_id, Done: false }],
        });
        if (!open_order) {
            const createOrder = orderRepository.create({
                userId: user_id,
                Done: false,
            });
            yield orderRepository.save(createOrder);
            const find_open_order = yield orderRepository.findOne({
                where: [{ userId: user_id }, { Done: false }],
            });
            const productToOrder = orderProductRepository.create({
                orderId: find_open_order === null || find_open_order === void 0 ? void 0 : find_open_order.id,
                product: { id: product === null || product === void 0 ? void 0 : product.id },
                quantity: 1,
            });
            yield orderProductRepository.save(productToOrder);
            return cart_1;
        }
        const productToOrder = yield orderProductRepository.findOne({
            order: { id: open_order === null || open_order === void 0 ? void 0 : open_order.id },
            product: { id: product === null || product === void 0 ? void 0 : product.id },
        });
        if (!productToOrder) {
            const productToOrder = orderProductRepository.create({
                order: { id: open_order === null || open_order === void 0 ? void 0 : open_order.id },
                product: { id: product === null || product === void 0 ? void 0 : product.id },
                quantity: 1,
            });
            yield orderProductRepository.save(productToOrder);
        }
        if (productToOrder) {
            productToOrder.quantity = productToOrder.quantity + 1;
            yield orderProductRepository.save(productToOrder);
            yield orderProductRepository.save(productToOrder);
        }
        return cart_1;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.putProductInCart = putProductInCart;
