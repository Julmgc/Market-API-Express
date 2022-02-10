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
exports.productById = void 0;
const typeorm_1 = require("typeorm");
const product_repository_1 = __importDefault(require("../../repository/product.repository"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const productById = (product_by_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsRepository = (0, typeorm_1.getCustomRepository)(product_repository_1.default);
        const product = yield productsRepository.findOne({
            where: { id: product_by_id },
        });
        if (!product) {
            throw new AppError_1.default("Product Not Found", 400);
        }
        return product;
    }
    catch (error) {
        throw new AppError_1.default(error.message, 401);
    }
});
exports.productById = productById;
exports.default = exports.productById;
