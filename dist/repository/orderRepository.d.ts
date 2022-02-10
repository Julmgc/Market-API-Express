import { Repository } from "typeorm";
import Order from "../entities/Order";
declare class OrderRepository extends Repository<Order> {
    findByuserId(userId: any): Promise<Order | undefined>;
}
export default OrderRepository;
