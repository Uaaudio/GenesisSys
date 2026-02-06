const Connection = require("../../config/connection");
const Sequelize = require("sequelize");

// Model que define o usuário, apenas eu terei o cargo "Wendell" (Funciona como o god mode).
// Todo email é unico então nenhum usuario pode ser registrado com email duplicado.

const User = Connection.define("users",{
    name:{
        type: Sequelize.STRING(),
        allowNull: false
    },
    password:{
        type: Sequelize.STRING(),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(),
        allowNull: true,
        unique: true
    },
    role:{
        type: Sequelize.ENUM('MEMBER','ADMIN','MASTER','WENDELL'),
        allowNull: false,
        defaultValue: 'MEMBER'
    },
    createdAt:{
            type: Sequelize.DATE(),
            allowNull: false
    },
    updatedAt:{
        type: Sequelize.DATE(),
        allowNull: false
        
    }
    
});


module.exports = User;