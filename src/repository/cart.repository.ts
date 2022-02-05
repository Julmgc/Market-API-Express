import { Repository, EntityRepository } from "typeorm";
import { Cart } from "../entities";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {
  public async findByuserId(userId: any): Promise<Cart | undefined> {
    const cart = await this.findOne({
      where: {
        user: userId,
      },
    });

    return cart;
  }
}
export default CartRepository;
