import OrderProduct from "./OrderProduct";
export default class Order {
    id: string;
    createdOn: Date;
    Done: boolean;
    userId: string;
    products: OrderProduct[];
    getTotal(): number;
}
