const express = require("express");
const router = express.Router();
const { adminlogin, usercreation } = require("../controllers/admincontroller");

// Admin login route
router.post("/adminlogin", adminlogin);

// User creation route
router.post("/usercreation", usercreation); // ✅ Corrected

module.exports = router;
