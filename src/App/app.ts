import * as Swagger from 'swagger-ui-express';
import express from 'express';
import routesAccount from './routes/Account';
import routesUser from './routes/User';
import * as swaggerDocument from '../app/documentation/swagger.json';

const app = express();

app.use(express.json());

app.use(routesUser);
app.use(routesAccount);

app.use('/', Swagger.serve, Swagger.setup(swaggerDocument));

export { app };
