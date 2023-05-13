import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            marca: Sequelize.STRING,
            descricao: Sequelize.STRING
        }, {
            sequelize,
            tableName: 'Produtos'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Categorias, {
            through: 'Categoria_Produtos',
            foreignKey: 'produto_id',
            as: 'fk_categoria'
        });
        this.belongsToMany(models.Fornecedores, {
            through: 'fornecedor_produtos',
            foreignKey: 'produto_id', 
            as: 'fk_fornecedor'
        });
    }
}

export default Produtos;