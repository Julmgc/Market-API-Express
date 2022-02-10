"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const createOrder_controller_1 = require("../controller/Order/createOrder.controller");
const getOrderById_controller_1 = require("../controller/Order/getOrderById.controller");
const listOrders_controller_1 = require("../controller/Order/listOrders.controller");
const router = (0, express_1.Router)();
const orderRouter = () => {
    router.post("/buy", authentication_middleware_1.isAuthenticated, createOrder_controller_1.createOrder);
    router.get("/buy", authentication_middleware_1.isAuthenticated, authentication_middleware_1.isAdm_middleware, listOrders_controller_1.getOrders);
    router.get("/buy/:id", authentication_middleware_1.isAuthenticated, getOrderById_controller_1.UserOrder);
    return router;
};
exports.orderRouter = orderRouter;
