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

routes.post('/auth', AuthController.store); //Rota login

routes.use(authMiddlewares); //Qualquer rota que vier abaixo, será uma rota autenticada.

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;