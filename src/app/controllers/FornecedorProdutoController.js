import Produtos from "../models/Produto";
import Categorias from "../models/Categoria";
import Fornecedores from "../models/Fornecedor";
import { Op } from "sequelize";

class FornecedorProdutosController {

    async storeFornecedorProdutos(req, res) {
        try {
            const { fornecedor_id } = req.params;
            const selected = req.body;

            const fornecedor = await Fornecedores.findByPk(fornecedor_id);
            const produto = selected.produto_id
            const produtos = await Produtos.findAll({
                where: { id: produto }
            })

            for (let item of produtos) {
                await fornecedor.addFk_produtos(item)
            }

            const forne = await Fornecedores.findByPk(fornecedor_id, {
                include: {
                    model: Produtos,
                    as: 'fk_produtos',
                    through: { attributes: [] }
                }
            });
            return res.json(forne);
        } catch (err) {
            console.log(err);
            return res.json({ message: 'Não foi possível registrar o Produto' });
        }
    }

    /* Mostrar todos os Produtos de um Fornecedor */
    /* produtos que trabalha - WEB */
    async indexFornecedorProdutos(req, res) {
        try {
            const { fornecedor_id } = req.params;

            const fornecedor = await Fornecedores.findByPk(fornecedor_id, {
                include: {
                    attributes: ['id', 'nome'],
                    model: Produtos,
                    as: 'fk_produtos',
                    through: { attributes: [] },
                    include: {
                        model: Categorias,
                        as: 'fk_categoria',
                        through: { attributes: [] }
                    }
                }
            });

            return res.json(fornecedor.fk_produtos);
        } catch (err) {
            console.log(err);
            return res.json({ message: 'Não foi possível mostrar os Produtos' });
        }
    }
}

export default new FornecedorProdutosController();