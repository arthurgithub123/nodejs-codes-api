import { getRepository, Repository } from "typeorm";

import { IUserTokensRepository } from "../interfaces/IUserTokensRepository";

import { UserTokens } from "../../models/entities/UserTokens";
import { User } from "../../models/entities/User";

class UserTokensRepository implements IUserTokensRepository {
  constructor() {
    this.repository = getRepository(UserTokens);
  }

  private repository: Repository<UserTokens>;

  async create(user: User, token: string, expiresIn: Date) {
    const userToken = this.repository.create({
      token,
      expiresIn,
      user
    });

    await this.repository.save(userToken);
  }

  async findOne(token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ token });
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTokensRepository };
