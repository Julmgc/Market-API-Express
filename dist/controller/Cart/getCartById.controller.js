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
exports.UserCart = void 0;
const getCartById_services_1 = require("../../services/Cart/getCartById.services");
const UserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const cart_id = req.params.id;
        const cart = yield (0, getCartById_services_1.userCart)(user_id, cart_id);
        const total = cart.getSubtotal();
        const response = { cart: cart, total: total };
        return res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.UserCart = UserCart;
