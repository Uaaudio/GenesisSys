const { Sequelize, NOW } = require("sequelize");
const User = require("./database/models/user");

const bcrypt = require('bcrypt');

async function createAdminUser(req,res) {
    
    const pass = "Admin"
    
    const hashpass = bcrypt.hash(pass,15);


    const userAdmin = await User.create({
        name:"Admin",
        password:hashpass,
        email:"admin@sistema.com",
        role:'WENDELL',
    });



};


module.exports = {createAdminUser};