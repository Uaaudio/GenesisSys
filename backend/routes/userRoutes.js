const express = require("express");
const router = express.Router();
const {seeFees,homePage} = require('../controllers/userController');

// minha função para verificar se de fato te um usuário logado.
const {loginVerfy} = require("../utils/loginVerify");


// Arquivo de rotas do usuario.
router.get("/seefees",loginVerfy,seeFees);
router.get("/home",loginVerfy,homePage);



module.exports = router;