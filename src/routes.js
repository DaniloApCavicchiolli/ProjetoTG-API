import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FileController from "./app/controllers/FileController";

import authMiddlewares from "./app/middlewares/auth";
import multerConfig from "./config/multer";

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
// Rota login
routes.post('/auth', AuthController.store); 

//Qualquer rota que vier abaixo, será uma rota autenticada.
routes.use(authMiddlewares); 

//rotas de usuários
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.destroy);

//rotas de files
routes.post("/files", upload.single("file"), FileController.store);

export default routes;