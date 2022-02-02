import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: any): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }
}
export default UserRepository;
