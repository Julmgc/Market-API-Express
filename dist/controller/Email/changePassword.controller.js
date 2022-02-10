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
exports.changePassword = void 0;
const changePasswordEmail_services_1 = require("../../services/Email/changePasswordEmail.services");
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, password, confirmation } = req.body;
        const new_password = yield (0, changePasswordEmail_services_1.changeUserPassword)(email, code, password, confirmation);
        return res.status(201).json("Your password was changed.");
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
