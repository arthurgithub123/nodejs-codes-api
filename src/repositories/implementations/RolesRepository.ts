import { IRolesRepository } from "../interfaces/IRolesRepository";

import { getRepository, Repository } from "typeorm";
import { Role } from "../../models/entities/Role";

class RolesRepository implements IRolesRepository {
  constructor() {
    this.repository = getRepository(Role);
  }

  private repository: Repository<Role>;

  async create(name: string): Promise<void> {
    const role = this.repository.create({ name });
    await this.repository.save(role);
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ name });
    return role;
  }
}

export { RolesRepository };
