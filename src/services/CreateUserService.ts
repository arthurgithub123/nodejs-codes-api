import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../models/dtos/ICreateUserDTO";
import { hash } from "bcryptjs";

@injectable()
class CreateUserService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) { }

  async execute({ name, email, password, role }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 9);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role
    });
  }
}

export { CreateUserService };
