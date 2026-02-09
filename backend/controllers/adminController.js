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
// função para listar os membros da igreja de acordo com o filtro
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
            
            res.send(users);

        }catch(error){
            console.log("Falha na consulta.");
            console.log(error);
            
            res.redirect("/admin/dashboard");
        };
    }else{
        console.log("Dados Incompletos");
        res.redirect("/admin/dashboard");
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
            
            res.redirect("/admin/dashboard");

        
        }catch(error){
            console.log("Erro ao Deletar usuario");
            console.log(error);
            res.send("Erro ao deletar usuario");
            res.redirect("/admin/dashboard");
        };
        
    }else{
        console.log("Dados incompletos");
        res.redirect("/admin/dashboard");

    };
    
};

// Função para editar usuario.
async function editUser (req,res){

    const userId = req.body.userId;
    var name = req.body.userName;
    var churchId = req.body.churchId;

    if (name && userId){
        
        try{
            // fas a busca do usuario pelo id ( chave primaria dele).
            const user = await User.findOne({where:{id: userId }});
                 
            if(user){

                // verifica se os dados não são nulos.

                if (name === undefined || name === ""){
                    name = user.name
                }
                if(churchId === undefined || churchId === ""){
                    churchId = user.churchId
                }


                // Atualiza o usuario. ( ja foi buscado la em cima).
                await user.update({
                    name:name,
                    churchId: churchId,
                });


                console.log("Usuário atualizado com sucesso");
                res.send("Usuario atualizado com sucesso");
                //res.redirect("/rota que vou escolher ") 
            
            //Caso ocorra um erro ao atualizar o user ele entra aqui.
            }else{

                console.log(error);
                console.log("Erro ao atualizar usuário");
                res.send("Error ao cadastrar usuario");

            };
                
        }catch(error){
            res.send("Usuário não existe");
            console.log(error);
        }
           

    // caso os dados estejam incompletos ele entra aqui.
    }else{
        
        console.log("Dados incompletos! , verifique por gentileza");
        res.send("Dados Incompletos");
    };

};

// função do dashboard do admin.
async function adminDashboard(req,res){
    
    try{
        const userLogged = req.session.user
        
        const today = new Date();
        const month = today.getMonth() + 1;
        //constante para pegar todos os usuarios do sistema.
        const totalUsers = await User.count();
        // Constante para pegar todas as contas pagas do mês atual.
        const payedFees = await montlhyFee.count({where:{month:month,status:true}});
        // Constante para pegar o total de igrejas registradas.
        const totalChurches = await Church.count();
        
        if(totalUsers !== undefined && totalChurches !== undefined && payedFees !== undefined){

            // Retorna a renderização da pagina do admin.
            return res.render("dashboard",{
                totalUsers,
                totalChurches,
                payedFees,
                userLogged
            });

        }else{

            console.log("Falha ao carregar página!");
            console.log("Por Gentileza confira os campos")
            
            // Retorna a rota do admin.
            return res.redirect("/dashboard");

        };

    }catch(error){

        console.log("Erro ao consultar dados!");
        console.log(error);

        res.send("Erro ao acessar o dashboard, por gentileza, faça login novamente");
        res.redirect("/")
        

    };
};



async function seeMyMembers(req,res) {
    try{
        const adminLogged = req.session.user;
        

        const users = await User.findAll({where:{
            churchId: adminLogged.churchId
        }});

        return res.render("users",{
            users
        });

    }catch(error){
        console.log("Error ao Consultar dados");
        console.log(error);
    };
    

};


async function manualLauch(req,res){

    try{

        // Campos pra consula.
        const feeId = req.body.feeId;
        const feeValue = req.body.feeValue;

        //verifica de os campos existem.
        if(feeId && feeValue > 0){

            // Busca a taxa pelo Id.
            const feeToLauch = await montlhyFee.findOne({where:{id:feeId}});

            //Verifica se a fatura de fato existe.
           if (feeToLauch){
                
                // Atualiza a fatura da vez.
                await feeToLauch.update({
                    value:feeValue,
                    status: true
                });

                // Após a alteração o usuario irá pro dashboard.
                console.log("Fatura lançada com sucesso");
                res.redirect("/admin/dashboard");

           }else{
                console.log("Falha ao buscar fatura");
                return res.redirect("/admin/dashboard");
           };

        }else{
            console.log("Id ou Valor Inválidos");
            return res.redirect("/admin/dashboard");

        };

    }catch(error){
        console.log("Falha ao receber os campos");
        return res.redirect("/admin/dashboard");

    };

};



module.exports = {createUser,deleteUser,listMemberperChurch,editUser,adminDashboard,manualLauch,seeMyMembers};





