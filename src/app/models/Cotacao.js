import Sequelize, { Model } from 'sequelize';

class Cotacoes extends Model {
    static init(sequelize) {
        super.init({
            fornecedor_id: Sequelize.STRING,
            solicitacao_id: Sequelize.STRING,
            valor: Sequelize.STRING,
        }, {
            sequelize
        });
    }
    static associate(models) {
        this.belongsTo(models.Fornecedores, {
            foreignKey: 'fornecedor_id',
            as: 'fk_fornecedor'
        });
        this.belongsTo(models.Solicitacoes, {
            foreignKey: 'solicitacao_id',
            as: 'fk_solicitacao'
        });
    }
}

export default Cotacoes;