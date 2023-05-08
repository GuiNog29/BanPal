import { Router } from "express";
import { AccountController } from "../../../../Presentation/Account/AccountController";

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello, worldaaaa!');
});

routes.get('/account/balance/:id', new AccountController().getBankBalance);
routes.put('/account/deposit', new AccountController().bankDeposit);
routes.put('/account/draft/:id', new AccountController().bankDraft);
routes.delete('/account/deleteAccount/:id', new AccountController().deleteAccount);

export default routes;
