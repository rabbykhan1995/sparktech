const User = require("../model/userModel");

const isAdmin = async (req, res, next) => {
    try {
        const id = req.id;
        const user = await User.findById({_id:id});

        if(user.roles.includes('admin')){
            return next();
        }

        return res.status(401).json({
            msg:"unauthorized request"
        });
    } catch (error) {
        return res.status(500).json({msg:"internal server error"})
    }
}

module.exports = {isAdmin};