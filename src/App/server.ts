import * as Swagger from 'swagger-ui-express';
// import * as dotenv from 'dotenv';
import express from 'express';
import routesAccount from './routes/Account';
import routesUser from './routes/User';
import * as swaggerDocument from '../swagger.json';

const app = express();
// dotenv.config();

app.use(express.json());

app.use(routesUser);
app.use(routesAccount);

app.use('/docs', Swagger.serve, Swagger.setup(swaggerDocument));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
