import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FileController from "./app/controllers/FileController";
import FornecedorController from "./app/controllers/FornecedorController";

import authMiddlewares from "./app/middlewares/auth";
import multerConfig from "./config/multer";
import AuthControllerFornecedor from "./app/controllers/AuthControllerFornecedor";

const routes = new Router();
const upload = multer(multerConfig);

// Rotas de registros
routes.post('/users', UserController.store);
routes.post('/fornecedor', FornecedorController.store);

// Rota login
routes.post('/auth', AuthController.store); 
routes.post('/authFornecedor', AuthControllerFornecedor.store); 

//Qualquer rota que vier abaixo, será uma rota autenticada.
routes.use(authMiddlewares);

//rotas de files
routes.post("/files", upload.single("file"), FileController.store);

//rotas de usuários
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.destroy);

//rotas de fornecedor
routes.get('/fornecedor', FornecedorController.index);
routes.put('/fornecedor/:id', FornecedorController.update);
routes.delete('/fornecedor/:id', FornecedorController.destroy);

export default routes;