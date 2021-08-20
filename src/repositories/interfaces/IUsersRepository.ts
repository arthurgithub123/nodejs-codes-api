import { ICreateUserDTO } from "../../models/dtos/ICreateUserDTO";

import { User } from "../../models/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updatePassword(id: string, password: string): Promise<void>;
}

export { IUsersRepository };
