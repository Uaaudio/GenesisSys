const express = require("express");
const router = express.Router();

const {doLogin} = require("../controllers/loginController");

router.put("/",doLogin);


module.exports = router ; 