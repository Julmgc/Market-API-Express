import Cart from "./Cart";
import Product from "./Product";
declare class CartProduct {
    id: string;
    product: Product;
    cart: Cart;
    cartId: string;
    created_at: Date;
    updated_at: Date;
    quantity: number;
}
export default CartProduct;
