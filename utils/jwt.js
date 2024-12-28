
require('dotenv').config();
var jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
   try {
         const verified =  jwt.verify(token, process.env.JWT_SECRET);
         return verified;
   } catch (error) {
     return null
   }
  
}

const generateToken = async (Id, email) => {
        const token = await jwt.sign({Id, email}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});
        return token;
   
}

module.exports = {generateToken, verifyToken};