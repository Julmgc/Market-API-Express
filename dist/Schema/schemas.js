"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordEmailSchema = exports.retrievePasswordSchema = exports.sendEmailSchema = exports.putProductInCartRegisterSchema = exports.productRegisterSchema = exports.loginRegisterSchema = exports.userRegisterSchema = void 0;
const yup = __importStar(require("yup"));
exports.userRegisterSchema = yup.object().shape({
    name: yup.string().required("Name field is required"),
    email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email field is required"),
    password: yup.string().required("Password field is required"),
    isAdm: yup.boolean().required("isAdm field is required"),
});
exports.loginRegisterSchema = yup.object().shape({
    email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email field is required"),
    password: yup.string().required("Password field is required"),
});
exports.productRegisterSchema = yup.object().shape({
    name: yup.string().required("Name field is required"),
    price: yup.number().required("Price field is required"),
    description: yup.string().required("Description field is required"),
});
exports.putProductInCartRegisterSchema = yup.object().shape({
    productId: yup.number().required("ProductId field is required"),
});
exports.sendEmailSchema = yup.object().shape({
    subject: yup.string().required("Subject field is required"),
    text: yup.string().required("text field is required"),
    email: yup.string().required("email field is required"),
});
exports.retrievePasswordSchema = yup.object().shape({
    email: yup.string().required("email field is required"),
});
exports.changePasswordEmailSchema = yup.object().shape({
    code: yup.string().required("Code field is required"),
    password: yup.string().required("Password field is required"),
    confirmation: yup.string().required("Confirmation field is required"),
    email: yup.string().required("email field is required"),
});
