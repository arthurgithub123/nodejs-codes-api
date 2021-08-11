import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateAdministratorService } from '../services/CreateAdministratorService';

class CreateAdministratorController {

  async handle(request: Request, response: Response): Promise<Response> {
    const createAdministratorService = container.resolve(CreateAdministratorService);
    
    const { name, email, password } = request.body;

    await createAdministratorService.execute({
      name,
      email,
      password,
      role: "Administrator"
    });

    return response.status(201).json({ statusCode: '201', message: 'Administrador criado com sucesso' });
  }
}

export { CreateAdministratorController };
