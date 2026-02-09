const express = require('express');
const router = express.Router();
const {createUser,deleteUser,listMemberperChurch,editUser,adminDashboard,manualLauch,seeMyMembers} = require('../controllers/adminController');


router.post("/newuser",createUser);
router.delete("/deleteuser",deleteUser);
router.use("/seemembers",listMemberperChurch);
router.put("/editmember",editUser);
router.use("/dashboard",adminDashboard);
router.use("/members",seeMyMembers);
router.use("/lauch",manualLauch);


module.exports = router ;





