const Connection = require("../../config/connection");
const Sequelize = require("sequelize");

// Model que define os pagamentos mensai.
// Valor inicial sempre começa em zero.



const montlhyFee = Connection.define('monthlyfee',{

    day:{
        type: Sequelize.INTEGER(),
        allowNull: false
    },
    month:{
        type: Sequelize.INTEGER(),
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER(),
        allowNull: false
    },
    status:{
        type:Sequelize.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
    value:{
        type: Sequelize.FLOAT(),
        allowNull:false,
        defaultValue: 0
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


module.exports = montlhyFee;