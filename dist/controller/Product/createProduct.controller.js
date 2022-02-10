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
exports.userCreate = void 0;
const createProduct_services_1 = require("../../services/Product/createProduct.services");
const typeorm_1 = require("typeorm");
const product_repository_1 = __importDefault(require("../../repository/product.repository"));
const userCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const productRepository = (0, typeorm_1.getCustomRepository)(product_repository_1.default);
        const duplicatedProduct = yield productRepository.findByName(name);
        if (duplicatedProduct) {
            return res
                .status(400)
                .json({ message: "A product with this name already exists" });
        }
        const product = yield (0, createProduct_services_1.createProduct)(req.body, res);
        return res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.userCreate = userCreate;
