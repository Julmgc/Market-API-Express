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
exports.userCreate = void 0;
const createUser_services_1 = require("../../services/User/createUser.services");
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const userCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        const duplicatedEmail = yield userRepository.findByEmail(email);
        if (duplicatedEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const user = yield (0, createUser_services_1.createUser)(req.body, res);
        return res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.userCreate = userCreate;
