import * as Swagger from 'swagger-ui-express';
// import * as dotenv from 'dotenv';
import express from 'express';
import routesAccount from './routes/account';
import routesUser from './routes/user';
import * as swaggerDocument from '../app/documentation/swagger.json';

const app = express();
// dotenv.config();

app.use(express.json());

app.use(routesUser);
app.use(routesAccount);

app.use('/', Swagger.serve, Swagger.setup(swaggerDocument));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
