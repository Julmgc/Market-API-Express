import Cart from "./Cart";
export default class User {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
    createdOn: Date;
    updatedOn: Date;
    cart: Cart;
}
