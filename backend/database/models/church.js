const Connection = require("../../config/connection");
const Sequelize = require("sequelize");

// Model que define as igrejas.
// Apenas a sede tem o campo main = true

const Church = Connection.define('churches',{
    
    churchName:{
        type: Sequelize.STRING(),
        allowNull: false
    },
    address:{
        type: Sequelize.STRING(),
        allowNull: false
    },
    mainChurch:{
        type: Sequelize.BOOLEAN(),
        allowNull: false
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

module.exports = Church;