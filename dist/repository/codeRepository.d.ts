import { Repository } from "typeorm";
import { Code, User } from "../entities";
declare class CodeRepository extends Repository<Code> {
    findByuserId(user: User): Promise<Code | undefined>;
}
export default CodeRepository;
