import { inject, injectable } from 'tsyringe';

import nodemailer from 'nodemailer';

import appsettings from '../../appsettings';

import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IUserTokensRepository } from '../repositories/interfaces/IUserTokensRepository';

import { GlobalErrorModel } from '../models/GlobalErrorModel';

import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';

@injectable()
class GenerateResetPasswordAndEmailService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository
  ) { }

  async execute(email: string) {
    const databaseUser = await this.usersRepository.findByEmail(email);

    if(!databaseUser) {
      throw new GlobalErrorModel('O Usuário não existe');
    }

    const { host, port, applicationEmail: user, password: pass } = appsettings.Email;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });

    const resetPasswordToken = `${uuidv4()}_${uuidv4()}`;
    const urlWithToken = `http://localhost:3000/users/create_password?token=${resetPasswordToken}`;

    transporter.sendMail({
      from: user,
      to: email,
      subject: 'Criação de senha - CodesAPI',
      html:
        "<div style='text-align: center;'>" +
          "<p>Olá, " + databaseUser.name + "</p>" +
          "<p>Clique no link abaixo para criar sua senha: <p>" +
          "<p><a href='" + urlWithToken + "'>" + urlWithToken + "</a></p>" +
          "<p>Obrigado, </p>" +
          "<p>Equipe Codes API</p>" +
        "</div>"
    })
    .then(() => {
      const expiresIn = dayjs().add(1, 'hour').toDate();

      this.userTokensRepository.create(databaseUser, resetPasswordToken, expiresIn);
    })
    .catch(err => {
      throw new GlobalErrorModel('Erro interno no servidor - ' + err);
    });
  }
}

export { GenerateResetPasswordAndEmailService };
