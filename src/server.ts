import express, { request, response } from 'express';

import './database';

import './shared/dependencyInjectionContainer';

const app = express();

app.use(express.json());

app.listen(3333);