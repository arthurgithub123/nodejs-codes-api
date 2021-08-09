import { Role } from "../../models/entities/Role";

interface IRolesRepository {

  create(name: string): Promise<void>;
  findByName(name: string): Promise<Role>;
}

export { IRolesRepository };
