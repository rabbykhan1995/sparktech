var express = require('express');
var userRoute = require('./router/userRoute');
var adminRoute = require('./router/adminRoute');

var authRoute = require('./router/authRoute');

var cookieParser = require('cookie-parser')
var app = express();

app.use(express.json());
app.use(cookieParser());

app
   .use('/user',userRoute)
   .use('/admin', adminRoute)
   .use('/auth', authRoute)

app.get('/', (req, res)=> {
    return res.json({msg:'hello from backend'});
});

app.listen(3000);