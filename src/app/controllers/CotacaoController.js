import Cotacoes from "../models/Cotacao";
import Solicitacoes from "../models/Solicitacao";
import Fornecedores from "../models/Fornecedor";
const { Op } = require("sequelize");

class CotacaoController {

    /* Adiciona relação entre Fornecedor e Solicitção (Cotação) */
    async store(req, res) {
        try {
            const { fornecedor_id, solicitacao_id } = req.params;
            const { valor } = req.body;

            const cotacao = await Cotacoes.create({
                fornecedor_id,
                solicitacao_id,
                valor,
            });

            return res.status(200).json(cotacao);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível realizar a cotação' });
        }
    }

    /* Mostrar todas as Cotações */
    async index(req, res) {
        try {
            const cotacoes = await Cotacoes.findAll({
                    attributes: ['id', 'valor', 'createdAt'],
                    include: [{
                    attributes: ['id', 'nome', 'marca', 'quantidade', 'forma_pagamento'],
                    model: Solicitacoes,
                    as: 'fk_solicitacao',
                }, {
                    attributes: ['id', 'name', 'email', 'telefone', 'cidade', 'endereco'],
                    model: Fornecedores,
                    as: 'fk_fornecedor'
                }],
            });

            const registros = cotacoes.length;
            return res.status(200).json({ registros: registros, content: cotacoes });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Não foi possível mostrar as Cotações' });
        }
    }

}

export default new CotacaoController();
