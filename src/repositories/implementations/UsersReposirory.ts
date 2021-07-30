import { IUsersRepository } from "../interfaces/IUsersRepository";

import { getRepository, Repository } from "typeorm";
import { User } from "../../models/entities/User";
import { ICreateUserDTO } from "../../models/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  constructor() {
    this.repository = getRepository(User);
  }

  private repository: Repository<User>;

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      passwordHash: password
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };