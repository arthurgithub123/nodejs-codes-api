import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const { name, email, password } = request.body;

    await createUserService.execute({
      name,
      email,
      password
    });

    return response.status(201).send();
  }
}

export { CreateUserController };