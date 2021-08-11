import { IUsersRepository } from "../interfaces/IUsersRepository";

import { getRepository, Repository } from "typeorm";
import { User } from "../../models/entities/User";
import { ICreateUserDTO } from "../../models/dtos/ICreateUserDTO";

import { container } from "tsyringe";

import { FindRoleByNameService } from "../../services/FindRoleByNameService";

class UsersRepository implements IUsersRepository {
  constructor() {
    this.repository = getRepository(User);
  }

  private repository: Repository<User>;

  async create({ name, email, password, role }: ICreateUserDTO): Promise<void> {
    const findRoleByNameService = container.resolve(FindRoleByNameService);

    const databaseRole = await findRoleByNameService.execute(role);

    const user = this.repository.create({
      name,
      email,
      passwordHash: password,
      roles: [databaseRole]
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };
