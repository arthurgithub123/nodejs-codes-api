import { Request, Response } from "express";

import { container } from "tsyringe";

import { SessionLoginService } from "../services/SessionLoginService";

class SessionLoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sessionLoginService = container.resolve(SessionLoginService);

    const { email, password } = request.body;

    const userToken = await sessionLoginService.execute({
      email,
      password
    });

    return response.status(200).json(userToken);
  }
}

export { SessionLoginController };
