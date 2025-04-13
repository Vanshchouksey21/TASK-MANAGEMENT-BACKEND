const express = require("express");
const router = express.Router();
const { adminlogin, usercreation , userdisplay , assigntask , deleteUser , updatetaskstatus  , getUserTasks } = require("../controllers/admincontroller");

// Admin login route
router.post("/adminlogin", adminlogin);

// User creation route
router.post("/usercreation", usercreation); 
router.get("/userdisplay", userdisplay); 
router.post("/assigntask", assigntask); 
router.delete("/deleteuser/:id", deleteUser);
router.put("/updatetaskstatus", updatetaskstatus);
router.get("/usertasks/:userId", getUserTasks);

module.exports = router;
