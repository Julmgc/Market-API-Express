"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const sendEmail_controller_1 = require("../controller/Email/sendEmail.controller");
const retrievePasswordCode_controller_1 = require("../controller/Email/retrievePasswordCode.controller");
const changePassword_controller_1 = require("../controller/Email/changePassword.controller");
const schema_validation_1 = require("../Schema/schema.validation");
const schemas_1 = require("../Schema/schemas");
const router = (0, express_1.Router)();
const emailRouter = () => {
    router.post("/email", (0, schema_validation_1.validate)(schemas_1.sendEmailSchema), authentication_middleware_1.isAuthenticated, authentication_middleware_1.isAdm_middleware, sendEmail_controller_1.sendEmail);
    router.post("/recuperar", (0, schema_validation_1.validate)(schemas_1.retrievePasswordSchema), retrievePasswordCode_controller_1.retrievePasswordCode);
    router.post("/alterar_senha", (0, schema_validation_1.validate)(schemas_1.changePasswordEmailSchema), changePassword_controller_1.changePassword);
    return router;
};
exports.emailRouter = emailRouter;
