import { Repository, EntityRepository } from "typeorm";
import { Product } from "../entities";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: any): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name: name,
      },
    });

    return product;
  }
}
export default ProductRepository;
