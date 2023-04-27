import Sequelize from "sequelize";
import User from "../app/models/User";
import File from "../app/models/File";
import databaseConfig from "../config/database";
import Fornecedor from "../app/models/Fornecedor";
import Categorias from "../app/models/Categoria";
import Produtos from "../app/models/Produto";

const models = [User, File, Fornecedor, Categorias, Produtos];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map((model) => model.init(this.connection))
            .map((model) => model?.associate && model.associate(this.connection.models))
    }
}

export default new Database();