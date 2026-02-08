const User = require("../database/models/user");
const Church = require("../database/models/church");

// importando bcrypt . 
const bcrypt = require("bcrypt");


async function doLogin(req,res) {

    const login = req.body.login;
    const password = req.body.password;

    if ( login && password){

        try{

            // procura o unico usuario com aquele email.
            const user = await User.findOne({where:{email:login}});

            if(user){

                const match = await (bcrypt.compare(password,user.password));

                if (match){

                    req.session.user={
                        id:user.id,
                        name:user.name,
                        churchId: user.churchId,
                        role: user.role
                    };

                    if(user.role === 'WENDELL' || user.role === 'ADMIN'){

                        // Força o save da sessão.
                        req.session.save(()=>{

                            res.redirect("/admin/dashboard");
                        });

                    }else{

                        // Força o save da sessão.
                        req.session.save(()=>{

                            res.redirect("/user/home");
                        });
                    };


                }else{
                    // Redireciona o usuario pra tela de login ao errar a senha.
                    console.log("Senha incorreta");
                    res.redirect("/");

                }
            }else{
                console.log("Usuario Não existe");
                res.redirect("/");
            }


        }catch(error){
            // Caso não consiga buscar o usuario ele cai aqui
            console.log("Falha ao buscar usuario");
            console.log(error);
            res.redirect("/");

        };

    }else{

        // Caso as credenciais não estejam completas ele cairá aqui. E será redirecionado pra tela inicial.
        console.log("Login e senha incompletos, verificar por gentileza.");
        res.redirect("/");
    };


};

// função para realizar o logout.
async function doLogout(req,res){

    req.session.destroy(()=>{
        console.log("Logout realizado com sucesso!!");
        res.redirect("/");
    });

};

module.exports = {doLogin,doLogout};