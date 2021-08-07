import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import 'reflect-metadata';
import './database';

import './shared/dependencyInjectionContainer';

import { router } from "./routes";

import { GlobalErrorModel } from './globalErrorHandling/GlobalErrorModel';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  return err instanceof GlobalErrorModel
    ? response.status(err.statusCode).json({ statusCode: err.statusCode, message: err.message })
    : response.status(500).json({ statusCode: 500, message: `Erro interno no servidor - ${err.message}` });
});

app.listen(44303, () => console.log('Server is running'));