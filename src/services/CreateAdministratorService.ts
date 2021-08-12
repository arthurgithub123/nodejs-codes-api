import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../models/dtos/ICreateUserDTO";
import { hash } from "bcryptjs";

import { GlobalErrorModel } from "../globalErrorHandling/GlobalErrorModel";

@injectable()
class CreateAdministratorService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) { }

  async execute({ name, email, password, role }: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(user) {
      throw new GlobalErrorModel('Já existe um usuário com esse e-mail');
    }
    
    const passwordHash = await hash(password, 9);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role
    });
  }
}

export { CreateAdministratorService };
