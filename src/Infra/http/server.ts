import * as Swagger from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import express from 'express';
import routesAccount from './routes/Account';
import routesUser from './routes/User';

const app = express();
dotenv.config();

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        name: 'Spec1'
      },
      {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        name: 'Spec2'
      }
    ]
  }
}

app.use(express.json());

app.use(routesUser);
app.use(routesAccount);

app.use('/docs', Swagger.serve, Swagger.setup(options));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
