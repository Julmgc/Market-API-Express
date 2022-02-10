"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializerRouter = void 0;
const user_router_1 = require("./user.router");
const product_router_1 = require("./product.router");
const cart_router_1 = require("./cart.router");
const order_router_1 = require("./order.router");
const email_router_1 = require("./email.router");
const initializerRouter = (app) => {
    app.use("/api/", (0, user_router_1.userRouter)());
    app.use("/api/", (0, product_router_1.productRouter)());
    app.use("/api/", (0, cart_router_1.cartRouter)());
    app.use("/api/", (0, order_router_1.orderRouter)());
    app.use("/api", (0, email_router_1.emailRouter)());
};
exports.initializerRouter = initializerRouter;
