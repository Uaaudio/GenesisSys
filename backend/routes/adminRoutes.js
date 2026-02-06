const express = require('express');
const router = express.Router();
const {createUser,deleteUser,listMemberperChurch} = require('../controllers/adminController');


router.post("/newuser",createUser);
router.delete("/deleteuser",deleteUser);
router.use("/seemembers",listMemberperChurch);


module.exports = router ;





