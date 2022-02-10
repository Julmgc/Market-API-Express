import { Repository } from "typeorm";
import { Cart } from "../entities";
declare class CartRepository extends Repository<Cart> {
    findByuserId(userId: any): Promise<Cart | undefined>;
}
export default CartRepository;
