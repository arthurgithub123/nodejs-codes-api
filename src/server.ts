import express, { request, response } from 'express';

import './database';

import './shared/dependencyInjectionContainer';

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333);