import { Request, Response, NextFunction } from "express";

import { GlobalErrorModel } from "../models/GlobalErrorModel";

async function GlobalErrorHandlingMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
  return err instanceof GlobalErrorModel
    ? 
      response
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message })
    : 
      response
        .status(500)
        .json({ statusCode: 500, message: `Erro interno no servidor - ${err.message}` });
}

export { GlobalErrorHandlingMiddleware };
