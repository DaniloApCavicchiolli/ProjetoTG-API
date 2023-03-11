module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'cotacao',
    define: {
        timestamps: true, // Garante que será criado um atributo: created_at e updated_at na tabela do banco de dados.
        underscored: true, // Permite o ORM criar nome de tabelas como products_item
        underscoredAll: true, // Permite o ORM criar nome dos atributos com caixa baixa e _ em vez de camelCase, pois essa é 
        //  a convenção de escrita no banco de dados.
    }
}