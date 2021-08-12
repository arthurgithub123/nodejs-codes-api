import { NextFunction, Request, Response } from "express";

import { GlobalErrorModel } from "../globalErrorHandling/GlobalErrorModel";

import { verify } from "jsonwebtoken";

import { UsersRepository } from "../repositories/implementations/UsersReposirory";

async function AuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if(!authorizationHeader) {
    throw new GlobalErrorModel('A requisição não possui o token');
  }

  const [, jsonWebToken] = authorizationHeader.split(' ');

  try {
    const { sub, role } = verify(jsonWebToken, 'fd6ae719bf3530b2c3776140d0f859e7') as { sub: string, role: string };

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if(!user) {
      throw new GlobalErrorModel('O Usuário não existe');
    }

    request.user = { id: sub, role };

    next();
  }
  catch {
    throw new GlobalErrorModel('O Token da requisição é inválido');
  }
}

export { AuthenticationMiddleware };
