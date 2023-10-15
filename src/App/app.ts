import express, { NextFunction, Request, Response } from 'express';
import routesUser from './routes/User';
import routesAccount from './routes/Account';
import * as Swagger from 'swagger-ui-express';
import * as swaggerDocument from '../app/documentation/swagger.json';
import { AppError } from '../Shared/Errors/AppError';

const app = express();
app.use(express.json());
app.use(routesUser);
app.use(routesAccount);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
});

app.use('/', Swagger.serve, Swagger.setup(swaggerDocument));

export { app };
