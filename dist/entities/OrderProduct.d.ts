import Order from "./Order";
import Product from "./Product";
declare class OrderProduct {
    id: string;
    product: Product;
    order: Order;
    orderId: string;
    created_at: Date;
    updated_at: Date;
    quantity: number;
}
export default OrderProduct;
