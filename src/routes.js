import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FileController from "./app/controllers/FileController";
import FornecedorController from "./app/controllers/FornecedorController";
import CategoriaController from "./app/controllers/CategoriaController";
import ProdutoController from "./app/controllers/ProdutoController";
import FornecedorProdutoController from "./app/controllers/FornecedorProdutoController";

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
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

//rotas de fornecedor
routes.get('/fornecedor', FornecedorController.index);
routes.get('/fornecedor/:id', FornecedorController.findOneByPk);
routes.put('/fornecedor/:id', FornecedorController.update);
routes.delete('/fornecedor/:id', FornecedorController.destroy);

//rotas de categoria
routes.post('/categoria', CategoriaController.store);
routes.get('/categoria', CategoriaController.index);
routes.get('/categoria_showAll', CategoriaController.showAll);
routes.get('/categoria/:id', CategoriaController.showOne);
routes.put('/categoria/:id', CategoriaController.update);
routes.delete('/categoria/:id', CategoriaController.destroy);

//rotas de produto
routes.post('/produto', ProdutoController.store);
routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.showOne);
routes.put('/produto/:id', ProdutoController.update);
routes.delete('/produto/:id', ProdutoController.destroy);
routes.delete('/produto_remove/:categoria_id', ProdutoController.remove);

//rotas Fornedor_Produtos
routes.post('/fornecedor_produtos/:fornecedor_id', FornecedorProdutoController.storeFornecedor);


export default routes;