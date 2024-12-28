const User = require("../model/userModel");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");



const userRegistration = async(req, res)=> {
    try {
       const {name, email, password} = req.body;
       // check if the email id already exists or not
       const isEmailAlreadyExist = await User.findOne({email});

       if(isEmailAlreadyExist){
          
          return res.json({msg:'user already registered'});
       }
       // check password length is must be greater than 8, if less than 8, then quit the operation
       if(password.length < 8){
          return res.json({msg:'password must be in 8 characters'});
       }
       
       const hashedPassword = await hashPassword(password);

       const newUser = await User.create({name, email, password:hashedPassword});

       if(!newUser) {
          return res.json({msg:'registeration failed'});
       }

      const token = await generateToken(newUser._id, email);

      res.cookie('token', token,{maxAge:3600000});
      res.set('token', token);

       return res.status(201).json({
          msg:"registration successfull", result: {name:newUser.name, email:newUser.email, _id: newUser._id, createdAt:newUser.createdAt, role:newUser.roles,
       }});
       
    } catch (error) {
       return res.status(500).json({msg:'internal server error'});
    }
 }

 const userLogin =  async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});

      if(!user){
         return res.status(401).json({msg:'wrong credential'});
      }

      const isPasswordVerified = await comparePassword(password, user.password);

      if(!isPasswordVerified){
         return res.status(401).json({msg:'wrong credential'});
      }
      const token = await generateToken(user._id, email);
      res.cookie('token', token,{maxAge:3600000});
      res.set('token', token);

      return res.status(200).json({msg:'authentication successfull', result:{_id:user._id,name:user.name,email:user.email, role:user.roles}});
    } catch (error) {
      
      return res.status(500).json({msg:'internal server error'});
    }
}

const userLogout = async( req, res)=> {
    res.clearCookie('token');
    res.removeHeader('token');
    return res.status(200).json({msg:'logut successfull'});
   }

 module.exports = {userRegistration, userLogin, userLogout}