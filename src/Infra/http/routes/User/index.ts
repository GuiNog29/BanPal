import { Router } from "express";
import { UserController } from "../../../../Presentation/User/UserController";

const routes = Router();

routes.post('/user/createUser', new UserController().create);
routes.get('/user/getUsers', new UserController().get);
routes.put('/user/update/:id', new UserController().put);
routes.delete('/user/delete/:id', new UserController().delete);

export default routes;
