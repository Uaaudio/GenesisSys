// importando tabelas.
const User = require('../database/models/user');
const Church = require('../database/models/church');
const montlhyFee = require('../database/models/fee');

//importando libs
const bcrypt = require('bcrypt');
const { where } = require('sequelize');


// Função para criar um usuario.

async function createUser(req,res){

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const churchId = req.body.churchId;

    if (name && email && password){

        // Linha que faz o hash da senha.
        try{

            const hashedPassword = await bcrypt.hash(password,15);
    
            await User.create({
                name:name,
                email:email,
                password:hashedPassword,
                churchId:churchId
            });


            res.send("Usuario Cadastrado com sucesso");
            //res.redirect("/rota que vou decidir");


        }catch(error){
            console.log(error);
        };

    }else{
        console.log("Dados incompletos");
        res.send("Dados incompletos");
        //res.redirect("/rota que vou decidir");
    };

};

async function listMemberperChurch(req,res){

    // Campo para inserir o Id da igreja que deseja filtrar os membros.
    const churchId = req.body.churchId; 
    // Campo para inserir status que deseja filtrar.
    const feeStatus = req.body.feeStatus;

    if(churchId && feeStatus){

        try{
            
            const users = await User.findAll({
                where:{
                    churchId: churchId,

                },include:[{
                    model:montlhyFee,
                    where:{status:feeStatus}
                }] // busca as contas pagas.
                });

            
            // Manda os usuarios para o front.

            //res.render("",{users});
            res.send(users);


        }catch(error){
            console.log("Falha na consulta.");
            console.log(error);
            res.send("Falha na consulta.");
            //res.redirect("/rota que vou decidir");

        };
    }else{
        console.log("Dados Incompletos");
        res.send("Dados Incompletos");
        //res.redirect("/rota que vou decidir");
    };

};

async function deleteUser(req,res){

    const userId = req.body.userId;
    const churchId = req.body.churchId;

    if(userId && churchId){
       
        try{

            await User.destroy({
                where:{
                    id:userId,
                    churchId:churchId
                }
            });

            console.log("Usuario Deletado com sucesso");
            res.send("Usuario Deletado com sucesso");
            //res.redirect("/");

        
        }catch(error){
            console.log("Erro ao Deletar usuario");
            console.log(error);
            res.send("Erro ao deletar usuario");
            //res.redirect("/");
        };
        
    }else{
        console.log("Dados incompletos");
        res.send("Dados incompletos");

    };
    
};


module.exports = {createUser,deleteUser,listMemberperChurch};





