import Sequelize, { Model } from 'sequelize';
import bcrypt from "bcryptjs";

class Fornecedores extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            telefone: Sequelize.STRING,
            cidade: Sequelize.STRING,
            endereco: Sequelize.STRING,
            acesso: Sequelize.INTEGER,
            nivel: Sequelize.INTEGER,
        }, {
            sequelize
        });

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, {
            foreignKey: 'avatar_id',
            as: 'avatar'
        });
        this.belongsToMany(models.Produtos, {
            through: 'fornecedor_produtos',
            foreignKey: 'fornecedor_id', 
            as: 'fk_produtos'
        });
        this.hasMany(models.Cotacoes, {
            foreignKey: 'fornecedor_id',
            as: 'fk_cotacao'
        }); 
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default Fornecedores;