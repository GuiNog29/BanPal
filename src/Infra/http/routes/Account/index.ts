import { Router } from "express";
import { AccountController } from "../../../../Presentation/Account/AccountController";

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello, worldaaaa!');
});

routes.post('/account', new AccountController().create)
routes.get('/account', new AccountController().get)
routes.put('/account/:id', new AccountController().put)
routes.delete('/account/:id', new AccountController().delete)

export default routes;
