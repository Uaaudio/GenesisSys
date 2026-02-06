// Arquivo resposavel pelos relacionamentos das tabelas.


const User = require('../database/models/user');
const Church = require('../database/models/church');
const montlhyFee = require('../database/models/fee');


// Relacionamentos abaixo:

Church.hasMany(User);
User.belongsTo(Church);

User.hasMany(montlhyFee);
montlhyFee.belongsTo(User);


module.exports = {
    User,
    Church,
    montlhyFee
}
  