const express = require("express");
const router = express.Router();

const {doLogin,doLogout} = require("../controllers/loginController");

router.post("/",doLogin);
router.get("/logout",doLogout);


module.exports = router ; 