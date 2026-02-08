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
            res.send("Fees");
            //onde eu vou renderizar a pagina, com as contas do usuario.(la eu consigo filtrar tudo certinho).
            //res.render("",{});
        }catch(error){

            console.log("Erro ao consultar dados");
            res.send("Erro ao consultar dados");
            //res.redirect("/Rota que vou decidir");
        };

    }else{
        res.send("Id do usuario não existe");
        //res.redirect("/Rota que eu decidir");
    };
};

async function homePage(req,res){
    
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
