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

}

export default new CotacaoController();
