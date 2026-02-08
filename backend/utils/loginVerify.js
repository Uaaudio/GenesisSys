
// Basicamente , uma função para verificar se tem um usuario logado , se não tiver ele vai voltar pro login


async function loginVerfy(req,res,next) {
  
    const userLogged = req.session.user;

    if (userLogged){
        next();
    }else{
        console.log("Nenhum Usuário logado");
        res.redirect("/");
    };

};



module.exports = {loginVerfy};