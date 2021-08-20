import { User } from "../../models/entities/User";
import { UserTokens } from "../../models/entities/UserTokens";

interface IUserTokensRepository {
  create(user: User, token: string, expiresIn: Date): Promise<void>;
  findOne(token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository };
