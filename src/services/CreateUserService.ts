import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../models/dtos/ICreateUserDTO";

@injectable()
class CreateUserService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {
    
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password
    });
  }
}

export { CreateUserService };