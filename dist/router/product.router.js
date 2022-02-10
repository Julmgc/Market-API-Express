"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const createProduct_controller_1 = require("../controller/Product/createProduct.controller");
const getProductById_controller_1 = require("../controller/Product/getProductById.controller");
const listProducts_controller_1 = require("../controller/Product/listProducts.controller");
const schema_validation_1 = require("../Schema/schema.validation");
const schemas_1 = require("../Schema/schemas");
const router = (0, express_1.Router)();
const productRouter = () => {
    router.post("/product", (0, schema_validation_1.validate)(schemas_1.productRegisterSchema), authentication_middleware_1.isAuthenticated, authentication_middleware_1.isAdm_middleware, createProduct_controller_1.userCreate);
    router.get("/product/:id", getProductById_controller_1.getProductById);
    router.get("/product", listProducts_controller_1.getProducts);
    return router;
};
exports.productRouter = productRouter;
