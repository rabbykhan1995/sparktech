const { verifyToken } = require("../utils/jwt");

// basically we can check an user is authorized or not with this middleware by keeping the authorization token named "token" from cookie or header.

const isLoggedIn = async (req, res, next)=> {
    // in this middleware first get token from cookies or headers
    const token = req.cookies?.token || req.headers?.token;
    // verify the token
    const tokenIsVerified = await verifyToken(token);

    // if not verified then send response to user 
    if(!tokenIsVerified){
        res.clearCookie('token');
        res.removeHeader('token');
        return res.status(401).json({msg:'unauthorized request'})
    }
    
    // if token verified then open the next route for user with storing the id and email attaching with the request body;
    req.id = tokenIsVerified.Id;
    req.email = tokenIsVerified.email;
    next();
}

const isAlreadyLoggedIn = async (req, res, next)=> {
    // in this middleware first get token from cookies or headers
    const token = req.cookies?.token || req.headers?.token;
    // verify the token
    const tokenIsVerified = await verifyToken(token);

    // if not verified then keep it give access to /auth/login route...
    if(!tokenIsVerified || !token){
      return next();
    }

    return res.status(304).json({msg:'already logged in'})
    
 
}

module.exports = {isLoggedIn, isAlreadyLoggedIn} 

