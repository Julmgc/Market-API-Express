import { Repository, EntityRepository } from "typeorm";
import { Product } from "../entities";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findById(id: any): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        id: id,
      },
    });

    return product;
  }
}
export default ProductRepository;
