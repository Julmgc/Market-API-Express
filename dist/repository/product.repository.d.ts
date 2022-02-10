import { Repository } from "typeorm";
import { Product } from "../entities";
declare class ProductRepository extends Repository<Product> {
    findByName(name: any): Promise<Product | undefined>;
}
export default ProductRepository;
