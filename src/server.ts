import express, { request, response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'retorno' }) 
});

app.listen(3333);