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

    static associate(models) {
        this.belongsToMany(models.Produtos, {
            through: 'Categoria_Produtos',
            foreignKey: 'categoria_id',
            as: 'fk_produtos'
        });
    }
}

export default Categorias;