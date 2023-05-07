import { Router } from "express";
import { UserController } from "../../../../Presentation/User/UserController";

const routes = Router();

routes.post('/createUser', new UserController().create)
routes.get('/getUsers', new UserController().get)
routes.put('/user/:id', new UserController().put)
routes.delete('/userDelete/:id', new UserController().delete)

export default routes;
