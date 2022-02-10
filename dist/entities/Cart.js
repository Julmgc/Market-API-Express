"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
const CartProduct_1 = __importDefault(require("./CartProduct"));
const class_transformer_1 = require("class-transformer");
let Cart = class Cart {
    getSubtotal() {
        const subtotal = this.products.reduce((acc, actual) => acc + Number(actual.product.price), 0);
        return subtotal;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "createdOn", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.default, (user) => user.cart),
    __metadata("design:type", User_1.default)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CartProduct_1.default, (cartProduct) => cartProduct.cart, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Cart.prototype, "products", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "subtotal" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], Cart.prototype, "getSubtotal", null);
Cart = __decorate([
    (0, typeorm_1.Entity)("carts")
], Cart);
exports.default = Cart;
