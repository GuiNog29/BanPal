import * as Swagger from 'swagger-ui-express';
import express from 'express';
import routesAccount from './routes/Account';
import routesUser from './routes/User';

const app = express();

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

app.use(routesAccount);
app.use(routesUser);

app.use('/docs', Swagger.serve, Swagger.setup(options));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
