const User = require('../model/userModel');
const { isLoggedIn, isAlreadyLoggedIn } = require('../middleware/auth');
const express = require('express');
const { userRegistration, userLogin, userLogout } = require('../controller/authController');
const router = express.Router();

router
      .get('/', (req, res)=> {
         return res.json({msg:'this is auth route'});
      })

      
      .post('/register', userRegistration)

     .post('/login',isAlreadyLoggedIn ,userLogin)

     .post('/logout', isLoggedIn, userLogout )


module.exports = router;