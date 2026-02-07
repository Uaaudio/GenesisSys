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

// linkando e configurando express-session.

const session = require("express-session");

app.use(session({
    secret: "Jesus-Salva", // "segredo"
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1800} // tempo de duração da sessão em segundo

}))


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

// Sincronizando com o banco , forçando a criação de tabelas caso não existam e sempre alterando elas de acordo com os models.
Connection.sync({force:false},{alter:true})
    .then(()=>{
        console.log("Banco sincronizado com sucesso");
    }).catch((error)=>{
        console.log(error);
    });




// importando minhas rotas.
const adminRoutes = require('./routes/adminRoutes');
const LoginRoutes = require('./routes/loginRoutes');

app.use("/admin",adminRoutes);
app.use("/login",LoginRoutes);




app.listen(PORT,()=>{
    console.log("Aplicação rodando na porta 3001");
});