const express = require('express');
const app = express();
const PORT = 3001 ;

//importando dotenv.
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // caminho do meu arquivo Env

//importando body-parser.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//importando sinc banco.
const Connection = require('./config/connection');
Connection.authenticate()
    .then(()=>{console.log("Banco conectado com sucesso")})
    .catch((error)=>{console.log(error)})


//importando meus models
const User = require('./database/models/user');
const Church = require('./database/models/church');
const montlhyFee = require('./database/models/fee');

const Relationships = require('./config/relationships');


Connection.sync({force:false},{alter:true})
    .then(()=>{
        console.log("Banco sincronizado com sucesso");
    }).catch((error)=>{
        console.log(error);
    });




// importando minhas rotas.
const adminRoutes = require('./routes/adminRoutes');

app.use("/admin",adminRoutes);




app.listen(PORT,()=>{
    console.log("Aplicação rodando na porta 3001");
});