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
exports.isAdm_middleware = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError_1.default("Missing authorization headers", 401));
        }
        const userid = decoded.id;
        req.user = { id: userid };
        next();
    });
};
exports.isAuthenticated = isAuthenticated;
const isAdm_middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const usersRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
    const userAdm = yield usersRepository.findOne({
        where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
    });
    if (!(userAdm === null || userAdm === void 0 ? void 0 : userAdm.isAdm)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
});
exports.isAdm_middleware = isAdm_middleware;
