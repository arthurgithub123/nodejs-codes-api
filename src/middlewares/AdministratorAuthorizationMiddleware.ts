import { NextFunction, Request, Response } from "express";

import { GlobalErrorModel } from "../globalErrorHandling/GlobalErrorModel";

async function AdministratorAuthorizationMiddleware(request: Request, response: Response, next: NextFunction) {
  if(!request.user.role.includes('Administrator')) {
    throw new GlobalErrorModel('Você não possui autorização', 401);
  }
  
  next();
}

export { AdministratorAuthorizationMiddleware };
