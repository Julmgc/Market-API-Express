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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePasswordCode = void 0;
const retrievePasswordCode_services_1 = __importDefault(require("../../services/Email/retrievePasswordCode.services"));
const retrievePasswordCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const send_conde = new retrievePasswordCode_services_1.default();
        const code = yield send_conde.execute(email);
        return res
            .status(200)
            .json("An email with a code to recover your password was sent.");
    }
    catch (err) {
        next(err);
    }
});
exports.retrievePasswordCode = retrievePasswordCode;
