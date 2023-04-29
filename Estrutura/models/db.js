const Sequelize = require('sequelize');
//conexão com o banco de dados
const sequelize = new Sequelize('postapp','root','root',{
    host: "127.0.0.1",
    port: "3306",
    dialect: 'mysql'
});

//vamos exportar as variaveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}