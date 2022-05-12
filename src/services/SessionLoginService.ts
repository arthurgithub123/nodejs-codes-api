import { inject, injectable } from "tsyringe";

import { GlobalErrorModel } from "../models/GlobalErrorModel";

import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";

import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

import { IUserToken } from "../models/dtos/IUserToken";
import { ILogin } from "../models/dtos/ILogin";

@injectable()
class SessionLoginService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) { }
  
  async execute({ email, password }: ILogin): Promise<IUserToken> {
    const user = await this.usersRepository.findByEmail(email);
    
    if(!user) {
      throw new GlobalErrorModel('E-mail ou senha incorreta');
    }

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if(!isPasswordCorrect) {
      throw new GlobalErrorModel('E-mail ou senha incorreta');
    }

    const token = sign(
      { email: user.email, role: user.roles[0].name },
      'fd6ae719bf3530b2c3776140d0f859e7', 
      { subject: user.id, expiresIn: '10m' }
    );

    return {
      user: { email: user.email, role: user.roles[0].name },
      token
    };
  }
}

export { SessionLoginService };
