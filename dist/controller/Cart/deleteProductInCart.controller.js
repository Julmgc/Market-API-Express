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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartProduct = void 0;
const deleteProductInCart_services_1 = require("../../services/Cart/deleteProductInCart.services");
const deleteCartProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        const authenticated_user_id = req.user.id;
        const updatedCart = yield (0, deleteProductInCart_services_1.deleteProductFromCart)(product_id, authenticated_user_id);
        return res.status(200).json(updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.products);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCartProduct = deleteCartProduct;
