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
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const listProducts_services_1 = require("../../services/Product/listProducts.services");
const app_1 = __importDefault(require("../../app"));
let TOKEN = "";
describe("User Controller Tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = (0, typeorm_1.getConnection)();
        yield connection.close();
    }));
    it("Should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "mail@mail.com",
            password: "12345",
            name: "Teste",
            isAdm: true,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user")
            .send(userData)
            .expect(201);
        expect(response.body).toHaveProperty("uuid");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body.name).toBe("Teste");
        expect(response.body.password).not.toBe("123");
    }));
    it("Should return users token", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "mail@mail.com",
            password: "12345",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/login")
            .send(userData)
            .expect(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body.password).not.toBe("1234");
        TOKEN = response.body.token;
    }));
    it("Should be able to return the products list", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield (0, listProducts_services_1.listProducts)();
        expect(products).toHaveProperty("map");
    }));
    it("Should send an email to the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "mail@mail.com",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/email")
            .send(userData)
            .set("Authorization", `Bearer ${TOKEN}`)
            .expect(200);
        expect(response.body).toMatch("Email was sent.");
    }));
    it("Should send a code to the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "mail@mail.com",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/recuperar")
            .send(userData)
            .expect(200);
        expect(response.body).toMatch("An email with a code to recover your password was sent.");
    }));
    it("Should change users password", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "assis@gmail.com",
            code: "d825067f-c9c7-4d97-81ca-d69eb2ee4aaf",
            password: "1234",
            confirmation: "1234",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/alterar_senha")
            .send(userData)
            .expect(201);
        expect(response.body).toMatch("Your password was changed.");
    }));
});
