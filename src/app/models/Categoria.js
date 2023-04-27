import Sequelize, { Model } from 'sequelize';

class Categorias extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'Categorias'
        })
    }
} 

export default Categorias;