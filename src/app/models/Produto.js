import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            marca: Sequelize.STRING,
            descricao: Sequelize.STRING
        }, {
            sequelize,
        })
    }
} 

export default Produtos;