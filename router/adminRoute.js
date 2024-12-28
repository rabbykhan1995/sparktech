var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const { createBus, updateBus, deleteBus, createTicket, updateTicket, deleteTicket } = require('../controller/adminController');

var router = express.Router();

router
    .get('/',(req, res)=> {
    return res.json({msg:'this is adming route'});
   })

   .post('/bus',isLoggedIn, isAdmin , createBus)

   .put('/bus/:id', isLoggedIn, isAdmin, updateBus)

   .delete('/bus/:id', isLoggedIn, isAdmin, deleteBus)

   .post('/ticket', isLoggedIn, isAdmin, createTicket)

   .put('/ticket/:id', isLoggedIn, isAdmin, updateTicket)

   .delete('/ticket/:id', isLoggedIn, isAdmin,deleteTicket)



module.exports = router;