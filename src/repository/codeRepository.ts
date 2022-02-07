import { Repository, EntityRepository } from "typeorm";
import { Code, User } from "../entities";

@EntityRepository(Code)
class CodeRepository extends Repository<Code> {
  public async findByuserId(user: User): Promise<Code | undefined> {
    const code = await this.findOne({
      where: {
        user: user,
      },
    });

    return code;
  }
}
export default CodeRepository;
