import { inject, injectable } from "tsyringe";

import { Role } from "../models/entities/Role";

import { IRolesRepository } from "../repositories/interfaces/IRolesRepository";

@injectable()
class FindRoleByNameService {
  constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) { }
  
  async execute(name: string): Promise<Role> {
    const role = await this.rolesRepository.findByName(name);
    return role;
  }
}

export { FindRoleByNameService };
