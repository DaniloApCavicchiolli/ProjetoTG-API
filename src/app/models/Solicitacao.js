import Sequelize, { Model } from 'sequelize';

class Solicitacoes extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            marca: Sequelize.STRING,
            quantidade: Sequelize.STRING,
            forma_pagamento: Sequelize.STRING,
        }, {
            sequelize
        });
    }
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'fk_user'
        });
        this.belongsTo(models.Produtos, {
            foreignKey: 'produto_id',
            as: 'fk_produto'
        });
    }
}

export default Solicitacoes;