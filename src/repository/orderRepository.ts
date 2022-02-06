import { Repository, EntityRepository } from "typeorm";
import Order from "../entities/Order";

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
  public async findByuserId(userId: any): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        user: userId,
      },
    });

    return order;
  }
}
export default OrderRepository;
