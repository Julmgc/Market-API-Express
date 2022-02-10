import User from "./User";
import CartProduct from "./CartProduct";
export default class Cart {
    id: string;
    createdOn: Date;
    updatedOn: Date;
    user: User;
    products: CartProduct[];
    getSubtotal(): number;
}
