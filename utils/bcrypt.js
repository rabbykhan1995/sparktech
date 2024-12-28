const bcrypt = require('bcrypt');

const hashPassword = async (password) => {

    if(typeof(password)=== "number"){
        const passwordHashed = await bcrypt.hash(JSON.stringify(password),10);
        return passwordHashed
    }else if(typeof(password)==='string'){
        const passwordHashed = await bcrypt.hash(password,10);
        return passwordHashed; 
    } 

    return null;
    
}

const comparePassword = async (password, hashedPassword) => {
    var isPasswordOk;

    if(typeof(password) !== 'string'){
         isPasswordOk = await bcrypt.compare(JSON.stringify(password), hashedPassword);
         return isPasswordOk
    } else if(typeof(password)==='string'){
     isPasswordOk = await bcrypt.compare(password, hashedPassword)
     return isPasswordOk

     };
    
        return null
    

    
}

module.exports = {hashPassword, comparePassword};