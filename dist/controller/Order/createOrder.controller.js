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
exports.createOrder = void 0;
const createOrder_services_1 = require("../../services/Order/createOrder.services");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const makeAnOrder = yield (0, createOrder_services_1.userOrder)(user_id);
        const total = makeAnOrder === null || makeAnOrder === void 0 ? void 0 : makeAnOrder.getTotal();
        const response = { Order: makeAnOrder, total: total };
        return res.status(200).json(response);
    }
    catch (error) {
        console.log("ERROR", error);
        next(error);
    }
});
exports.createOrder = createOrder;
