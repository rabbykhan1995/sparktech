var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URI}`)

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim: true,
        lowercase:true
    },
    email:{
        type: String,
        match:[/\S+@\S+\.\S+/,'invalid email format'],
        trim:true,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength: 8,
        trim:true  
        // don't use any space before or after password because it will not remember or count it as password input.
    },
    roles:{
        type:[String],
        enum:['user', 'admin'],
        default:['user'],
    }


},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;