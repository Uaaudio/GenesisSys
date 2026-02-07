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
                        const AdminLogged = req.session.user;
                        res.send("Administradores");


                    }else{
                        res.send("Usuario comum");
                    }



                }else{
                    console.log("Senha incorreta");
                    res.send("Perdão, senha incorreta");

                }
            }else{
                console.log("Usuario Não existe");
                res.send("Usuario não existe");
            }


        }catch(error){
            console.log("Falha ao buscar usuario");
            console.log(error);
            res.send("Falha ao buscar Usuario");

        };

    }else{
        console.log("Login e senha incompletos, verificar por gentileza.");
        res.send("Credenciais incompletas");
    };


};

module.exports = {doLogin};