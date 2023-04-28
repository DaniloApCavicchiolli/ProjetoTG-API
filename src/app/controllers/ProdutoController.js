import Produtos from "../models/Produto";
import Categorias from "../models/Categoria";
import { Op } from "sequelize";

class ProdutoController {
    /* Registrar produtos */
    async store(req, res) {
        try {
            const data = req.body;
            const { nome, marca, descricao } = req.body;

            const prod = await Produtos.findOne({
                where: { nome: nome }
            });
            if (prod) {
                return res.json({ message: "Produto já cadastrado!" });
            }

            const categorias = data.categorias
            const categoria = await Categorias.findAll({
                where: { nome: { [Op.in]: categorias } }
            });

            const produto = await Produtos.create({
                nome,
                marca,
                descricao
            });

            categoria.forEach(async (element) => {
                await produto.setFk_categoria(element);
            });

            const produtos = await Produtos.findByPk(produto.id, {
                include: {
                    attributes: ['id', 'nome'],
                    model: Categorias,
                    as: 'fk_categoria'
                }
            });

            // const prod = await Produtos.create(data);
            return res.status(200).json(produtos);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível cadastrar o Produto' })
        }
    }

    /* Mostrar todas os produtos - Paginado */
    async index(req, res) {
        try {
            const { page = 0 } = req.query;

            const registros = await Produtos.count();
            const pages = Math.ceil(registros / 5);

            const produtos = await Produtos.findAll({
                include: {
                    attributes: ['id', 'nome'],
                    model: Categorias,
                    as: 'fk_categoria',
                    through: { attributes: [] }
                },
                limit: 5,
                offset: 5 * page,
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            return res.json({ totalPages: pages, content: produtos });
        } catch (err) {
            console.log(err);
            return res.json({ message: 'Não foi possível mostrar os produtos' })
        }
    }

    /* Mostrar um Produto */
    async showOne(req, res) {
        try {
            const { id } = req.params;

            const produto = await Produtos.findOne({
                where: { id },
                include: {
                    model: Categorias,
                    as: "fk_categoria"
                }
            })

            return res.json(produto)
        } catch (err) {
            return res.json({ message: 'Não foi possível mostrar o Produto' })
        }
    }

    /* Atualizar Produto */
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            await Produtos.update(data, {
                where: { id },
            });

            const produto = await Produtos.findByPk(id, {
                include: {
                    model: Categorias,
                    as: 'fk_categoria'
                }
            });

            const cetegoProduto = produto.fk_categoria
            cetegoProduto.forEach(async (element) => {
                await produto.removeFk_categoria(element); 
            });

            const categorias = data.categorias
            const categoria = await Categorias.findAll({
                where: { nome: categorias }
            })

            categoria.forEach(async (element) => {
                await produto.setFk_categoria(element);
            });

            return res.json({ message: 'Atualizado com sucesso!' })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Não foi possível atualizar o produto' });
        }
    }

    /* Deletar Produto */
    async destroy(req, res) {
        try {
            const { id } = req.params;

            await Produtos.destroy({
                where: { id }
            });

            return res.status(200).json({ message: 'Deletado com sucesso!' })
        } catch (err) {
            return res.status(400).json({ message: 'Não foi possível deletar o Produto!' })
        }
    }

    /* Remove Relação Produto */
    async remove(req, res) {
        try {
            const { categoria_id } = req.params;
            const { nome } = req.body;

            const categoria = await Categorias.findByPk(categoria_id);

            if (!categoria) {
                return res.status(400)
                    .json({ error: "Categoria não encontrada" });
            }

            const produto = await Produtos.findOne({
                where: { nome }
            });

            await categoria.removeFk_produtos(produto)

            return res.json({ message: 'Deletado com sucesso' });
        } catch (err) {
            return res.json({ error: 'Não foi possível deletar o Produto!' });
        }
    }
}

export default new ProdutoController();