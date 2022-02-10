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
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const cart_repository_1 = __importDefault(require("../../repository/cart.repository"));
const typeorm_1 = require("typeorm");
const createUser = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isAdm } = body;
    const userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
    const cartRepository = (0, typeorm_1.getCustomRepository)(cart_repository_1.default);
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const user = userRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
        isAdm: isAdm,
        createdOn: new Date(),
        updatedOn: new Date(),
    });
    yield userRepository.save(user);
    const user_cart = cartRepository.create({ user: user });
    yield cartRepository.save(user_cart);
    const returned_user = {
        uuid: user.id,
        createdOn: new Date(),
        updatedOn: new Date(),
        name: name,
        email: email,
        isAdm: isAdm,
    };
    return returned_user;
});
exports.createUser = createUser;
