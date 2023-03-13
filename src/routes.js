import { Router } from "express";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";

import authMiddlewares from "./app/middlewares/auth";

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.store);

routes.use(authMiddlewares); //Qualquer rota que vier abaixo, será uma rota autenticada.

routes.put('/users', UserController.update);

export default routes;