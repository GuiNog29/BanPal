import { Router } from "express";
import { UserController } from "../../../Presentation/User/UserController";

const routes = Router();

routes.get('/user/getAllUsers', new UserController().getAllUsers);
routes.post('/user/createUser', new UserController().createUser);
routes.put('/user/updateUser', new UserController().updateUser);
routes.delete('/user/deleteUser', new UserController().deleteUser);

export default routes;
