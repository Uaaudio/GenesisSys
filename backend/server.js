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

// linkando e configurando ejs.


const ejs = require("ejs");
app.set("view engine","ejs");
app.use(express.static("../frontend"));
app.set("views",path.join(__dirname,"../frontend/pages"));



// linkando e configurando express-session.
const session = require("express-session");

app.use(session({
    secret: "Jesus-Salva", // "segredo"
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false} // tempo de duração da sessão em segundo

}))


//importando sinc banco.
const Connection = require('./config/connection');

Connection.authenticate()
    .then(()=>{console.log("Banco conectado com sucesso")})
    .catch((error)=>{console.log(error)})

// função para gerar as taxas mensais.
const generateFee = require("./utils/generateFee");


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
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');


// Rota Main.
app.get("/",(req,res)=>{
    res.render("login");
});

app.use("/admin",adminRoutes);
app.use("/login",loginRoutes);
app.use("/user",userRoutes);




app.listen(PORT,()=>{
    console.log("Aplicação rodando na porta 3001");
});