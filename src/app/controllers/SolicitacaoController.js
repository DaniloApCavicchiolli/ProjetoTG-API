import Solicitacoes from "../models/Solicitacao";
import User from "../models/User";
import Fornecedores from "../models/Fornecedor";
import Produtos from "../models/Produto";
import Categorias from "../models/Categoria";
import Cotacoes from "../models/Cotacao";
const { Op } = require("sequelize");

class SolicitacaoController {
    /* Criar solicitação */
    async store(req, res) {
        try {
            const data = req.body;
            const produtos = data.itens.map(produto_id => {
                const obj = {
                    nome: produto_id.nome,
                    forma_pagamento: data.forma_pagamento,
                    user_id: data.user_id,
                    marca: produto_id.marca,
                    quantidade: produto_id.quantidade,
                    produto_id: produto_id.produto_id
                }

                return (obj);
            });

            const solicitacoes = await Solicitacoes.bulkCreate(produtos);

            return res.status(200).json(solicitacoes);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível criar a Solicitação' })
        }
    }

    async index(req, res) {
        try {
            const solicitacoes = await Solicitacoes.findAll({
                include: [{
                    attributes: ['id', 'name'],
                    model: User,
                    as: 'fk_user'
                }, {
                    attributes: ['id', 'nome'],
                    model: Produtos,
                    as: 'fk_produto',
                    include: {
                        attributes: ['nome'],
                        model: Categorias,
                        as: 'fk_categoria',
                        through: { attributes: [] }
                    }
                }, {
                    attributes: ['id', 'fornecedor_id', 'solicitacao_id', 'valor'],
                    model: Cotacoes,
                    as: 'fk_cotacao',
                    include: {
                        attributes: ['id', 'name'],
                        model: Fornecedores,
                        as: 'fk_fornecedor',
                    }
                }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            const cotacao = []

            solicitacoes.forEach((item) => {
                if (item.fk_cotacao.length === 0) {
                    return cotacao.push(item.dataValues)
                }

                item.fk_cotacao.map((data) => {
                    cotacao.push({ ...item.dataValues, fk_cotacao: [data] })
                })
            });

            const registros = solicitacoes.length;

            return res.status(200).json({ registros: registros, content: cotacao });
        } catch (err) {
            console.log(err);
            return res.status(200).json({ error: 'Não foi possível mostrar as solicitções' })
        }
    }

    async indexByClient(req, res) {
        const { clientId } = req.params;
        try {
            const solicitacoes = await Solicitacoes.findAll({
                where: {
                    user_id: clientId
                },
                include: [{
                    attributes: ['id', 'nome'],
                    model: Produtos,
                    as: 'fk_produto',
                    include: {
                        attributes: ['nome'],
                        model: Categorias,
                        as: 'fk_categoria',
                        through: { attributes: [] }
                    }
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const registros = solicitacoes.length;

            return res.status(200).json({ registros: registros, content: solicitacoes });
        } catch (err) {
            console.log(err);
            return res.status(200).json({ error: 'Não foi possível mostrar as solicitções' })
        }
    }

    async indexByFornecedor(req, res) {
        const { fornecedorId } = req.params;
        console.log('fornecedorId', fornecedorId);

        try {
            const fornecedor = await Fornecedores.findByPk(fornecedorId, {
                include: [{
                    attributes: ['id', 'nome'],
                    model: Produtos,
                    as: 'fk_produtos',
                    through: {
                        as: 'fornecedor_produtos',
                        attributes: []
                    },
                }]
            });

            const solicitacoes = await Solicitacoes.findAll({
                where: {
                    produto_id: { [Op.in]: fornecedor.fk_produtos?.map(item => item.id) },
                },
                include: [{
                    attributes: ['id', 'nome'],
                    model: Produtos,
                    as: 'fk_produto',
                    include: {
                        attributes: ['id', 'nome'],
                        model: Categorias,
                        as: 'fk_categoria',
                        through: {
                            as: 'categoria_produtos',
                            attributes: []
                        },
                    }
                }, {
                    attributes: ['id', 'fornecedor_id', 'solicitacao_id', 'valor'],
                    model: Cotacoes,
                    as: 'fk_cotacao',
                    where: { fornecedor_id: fornecedorId },
                    required: false,
                    include: {
                        attributes: ['id', 'name'],
                        model: Fornecedores,
                        as: 'fk_fornecedor',
                    }
                }, {
                    attributes: ['id', 'name'],
                    model: User,
                    as: 'fk_user'
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            const registros = solicitacoes.length;
            return res.status(200).json({ registros: registros, content: solicitacoes });
        } catch (err) {
            console.log(err);
            return res.status(200).json({ error: 'Não foi possível mostrar as solicitções' })
        }
    }

}

export default new SolicitacaoController();
