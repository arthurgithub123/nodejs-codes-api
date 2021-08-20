import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { GenerateResetPasswordAndEmailService } from '../services/GenerateResetPasswordAndEmailService';

class GenerateResetPasswordAndEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const generateResetPasswordAndEmailService = container.resolve(GenerateResetPasswordAndEmailService);

    const { email } = request.body;

    await generateResetPasswordAndEmailService.execute(email);

    return response.status(200).json({
      statusCode: 200,
      message: 'O link para criação de senha foi enviado para seu e-mail'
    });
  }
}

export { GenerateResetPasswordAndEmailController };
