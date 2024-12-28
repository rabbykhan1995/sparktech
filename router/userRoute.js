const { viewTicket, viewBus, purchaseTicket } = require('../controller/userController');
var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();

router
      .get('/', (req, res)=> {
         return res.json({msg:'this is user route'})
      })
      .get('/buses', viewBus)

      .get('/tickets', viewTicket )

      .post('/tickets/purchase', isLoggedIn, purchaseTicket );

module.exports = router;