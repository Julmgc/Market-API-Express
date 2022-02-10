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
exports.UserOrder = void 0;
const getOrderById_services_1 = require("../../services/Order/getOrderById.services");
const UserOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const order_id = req.params.id;
        const order = yield (0, getOrderById_services_1.userOrder)(user_id, order_id);
        return res.status(200).json(order);
    }
    catch (err) {
        next(err);
    }
});
exports.UserOrder = UserOrder;
