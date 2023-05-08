import { Router } from "express";
import { AccountController } from "../../../../Presentation/Account/AccountController";

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello, world!');
});

routes.get('/account/balance', new AccountController().getBankBalance);
routes.put('/account/deposit', new AccountController().bankDeposit);
routes.put('/account/draft', new AccountController().bankDraft);
routes.put('/account/transfer', new AccountController().bankTransfer);

export default routes;
