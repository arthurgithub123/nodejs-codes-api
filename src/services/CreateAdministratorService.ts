import { container, inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../models/dtos/ICreateUserDTO";
import { hash } from "bcryptjs";

import { GlobalErrorModel } from "../models/GlobalErrorModel";
import { validateEmail, validateName } from "../shared/utils/UserValidationFunctions";

import { v4 as uuidv4 } from 'uuid';

import { GenerateResetPasswordAndEmailService } from "./GenerateResetPasswordAndEmailService";

@injectable()
class CreateAdministratorService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) { }

  async execute({ name, email, password, role }: ICreateUserDTO): Promise<void> {
    const generateResetPasswordAndEmailService = container.resolve(GenerateResetPasswordAndEmailService);

    validateName(name);
    
    validateEmail(email);

    const user = await this.usersRepository.findByEmail(email);

    if(user) {
      throw new GlobalErrorModel('Já existe um usuário com esse e-mail');
    }
    
    password = `${uuidv4()}_${uuidv4()}`;

    const passwordHash = await hash(password, 9);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role
    });

    await generateResetPasswordAndEmailService.execute(email);
  }
}

export { CreateAdministratorService };
