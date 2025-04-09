const express = require('express');
const router = express.Router();
const { userLogin } = require('../controllers/usercontroller');

router.post('/userlogin', userLogin);

module.exports = router;