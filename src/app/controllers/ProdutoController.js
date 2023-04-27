import Produtos from "../models/Produto";

class ProdutoController {
    /* Registrar produtos */
    async store(req, res) {
        try {
            const data = req.body;
            const { nome } = req.body;

            const produto = await Produtos.findOne({
                where: { nome: nome }
            });
            if (produto) {
                return res.json({ message: "Produto já cadastrado!" });
            }

            const prod = await Produtos.create(data);
            return res.status(200).json(prod);
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
                where: { id }
            })

            return res.json(produto)
        } catch (err) {
            return res.json({ message: 'Não foi possível mostrar o Produto' })
        }
    }

    /* Editar Produto */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const data = req.body;

            const produtoExists = await Produtos.findOne({
                where: { nome }
            });
            if (produtoExists) {
                return res.status(400).json({ message: "Produto já cadastrada!" });
            }

            const produto = await Produtos.findByPk(id);
            const response = await produto.update(data);

            return res.status(200).json(response)
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível editar o Produto' })
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
}

export default new ProdutoController();