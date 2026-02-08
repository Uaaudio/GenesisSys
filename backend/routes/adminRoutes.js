const express = require('express');
const router = express.Router();
const {createUser,deleteUser,listMemberperChurch,editUser,adminDashboard} = require('../controllers/adminController');


router.post("/newuser",createUser);
router.delete("/deleteuser",deleteUser);
router.use("/seemembers",listMemberperChurch);
router.put("/editmember",editUser);
router.use("/dashboard",adminDashboard);


module.exports = router ;





