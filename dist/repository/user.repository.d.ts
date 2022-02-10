import { Repository } from "typeorm";
import { User } from "../entities";
declare class UserRepository extends Repository<User> {
    findByEmail(email: any): Promise<User | undefined>;
}
export default UserRepository;
