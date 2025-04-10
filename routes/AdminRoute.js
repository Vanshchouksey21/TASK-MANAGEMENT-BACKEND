const express = require("express");
const router = express.Router();
const { adminlogin, usercreation , userdisplay , assigntask } = require("../controllers/admincontroller");

// Admin login route
router.post("/adminlogin", adminlogin);

// User creation route
router.post("/usercreation", usercreation); 
router.get("/userdisplay", userdisplay); 
router.post("/assigntask", assigntask); 

module.exports = router;
