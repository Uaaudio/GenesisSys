const User = require("../database/models/user");
const montlhyFee = require("../database/models/fee");

const { where } = require("sequelize");

// Função pra ver as taxas do usuario.
async function seeFees(req,res){

    const userLogged = req.session.user 

    if(userLogged && userLogged.id){

        try{

            //buscando todas as contas do usuario.
            const fees = await montlhyFee.findAll({where:{userId:userLogged.id},order:[['createdAt','DESC']]});
            
            console.log(fees);
            
            res.render("fees",{
                fees,
                userLogged
            });
            



        }catch(error){

            console.log("Erro ao consultar dados");
            res.redirect("/user/home");
        };

    }else{
        // Caso o id do user estaeja vazio ou com problema ele cai aqui.
        res.redirect("/user/home");
    };
};

async function homePage(req,res){
    
    // Constante que pega o id do usuario na sessão.
    const userLogged = req.session.user;    

    try{
        
        res.render("home",{userLogged});

    }catch(error){
        
        console.log("Erro ao buscar usuario");
        console.log(error);
        res.redirect("/");
    };
        
    

};

module.exports = {seeFees,homePage};
