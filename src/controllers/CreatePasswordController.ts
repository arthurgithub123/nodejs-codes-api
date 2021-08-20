import { Request, Response } from "express";

import { container } from "tsyringe";
import { CreatePasswordService } from "../services/CreatePasswordService";

class CreatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createPasswordService = container.resolve(CreatePasswordService);

    const { password } = request.body;
    const { token } = request.query;

    await createPasswordService.execute(token as string, password);

    return response.status(200).json({ statusCode: 200, message: 'Senha criada com sucesso' });
  }
}

export { CreatePasswordController };
