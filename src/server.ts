import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import 'reflect-metadata';
import './database';

import './shared/dependencyInjectionContainer';

import { router } from "./routes";

import { GlobalErrorHandlingMiddleware } from './middlewares/GlobalErrorHandlingMiddleware';

const app = express();

app.use(express.json());

app.use(router);

app.use(GlobalErrorHandlingMiddleware);

app.listen(44303, () => console.log('Server is running'));
