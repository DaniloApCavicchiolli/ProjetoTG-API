import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import FileController from "./app/controllers/FileController";
import FornecedorController from "./app/controllers/FornecedorController";
import CategoriaController from "./app/controllers/CategoriaController";
import ProdutoController from "./app/controllers/ProdutoController";
import FornecedorProdutoController from "./app/controllers/FornecedorProdutoController";
import SolicitacaoController from "./app/controllers/SolicitacaoController";
import CotacaoController from "./app/controllers/CotacaoController";

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
routes.get('/produto_showAll', ProdutoController.showAll);
routes.put('/produto/:id', ProdutoController.update);
routes.delete('/produto/:id', ProdutoController.destroy);
routes.delete('/produto_remove/:categoria_id', ProdutoController.remove);

//rotas Fornedor_Produtos
routes.post('/fornecedor_produtos/:fornecedor_id', FornecedorProdutoController.storeFornecedorProdutos);
routes.get('/fornecedor_produtos/:fornecedor_id', FornecedorProdutoController.indexFornecedorProdutos);
routes.get('/fornecedor_produtos_notSelected/:fornecedor_id', FornecedorProdutoController.indexFornecedorProdutosNotSelected);
routes.delete('/fornecedor_produtos/:fornecedor_id/:produto_id', FornecedorProdutoController.removeProduto);

//rotas solicitações
routes.post('/solicitacao', SolicitacaoController.store);
routes.get('/solicitacao', SolicitacaoController.index);
routes.get('/solicitacao/:clientId', SolicitacaoController.indexByClient);
routes.get('/solicitacao_fornecedor/:fornecedorId', SolicitacaoController.indexByFornecedor);

//rotas cotações
routes.post('/fornecedor/:fornecedor_id/solicitacao/:solicitacao_id', CotacaoController.store);
routes.get('/cotacoes', CotacaoController.index);
routes.get('/cotacoes_fornecedor/:fornecedor_id', CotacaoController.indexFornecedor);
routes.delete('/cotacao/:id', CotacaoController.destroy);


export default routes;