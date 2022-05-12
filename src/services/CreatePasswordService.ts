import { inject, injectable } from "tsyringe";

import { GlobalErrorModel } from "../models/GlobalErrorModel";

import { hash } from "bcryptjs";

import { IUserTokensRepository } from "../repositories/interfaces/IUserTokensRepository";
import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";

import dayjs from 'dayjs';

@injectable()
class CreatePasswordService {
  constructor(
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) { }

  async execute(resetPasswordToken: string, newPassword: string) {

    const userTokens = await this.userTokensRepository.findOne(resetPasswordToken);

    if(!userTokens) {
      throw new GlobalErrorModel('Token inválido');
    }

    if(!dayjs(Date.now()).isBefore(userTokens.expiresIn)) {
      await this.userTokensRepository.deleteById(userTokens.id);
      
      throw new GlobalErrorModel('O token expirou');
    }

    const passwordHash = await hash(newPassword, 9);

    await this.usersRepository.updatePassword(userTokens.user.id, passwordHash);

    await this.userTokensRepository.deleteById(userTokens.id);
  }
}

export { CreatePasswordService };
