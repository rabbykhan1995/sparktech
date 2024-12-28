var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URI}`)

const busSchema = mongoose.Schema({
  busType:{
    type:String,
    trim:true,
    enum:["AC","NON-AC"],
    default:"NON-AC",
    required:true,
  },
  model:{
    type:String,
    trim:true,
    required: true
  }
  ,
  operator:{
    type:String,
    trim:true,
    required:true,
  },

  stoppage:{
    type:[String],
    default:[]
  },
  totalSeats: {
    type: Number,
    required:true
  },
  route:{
    startFrom:{
        type:String,
        trim:true,
        required:true
      },
      endTo:{
        type:String,
        trim:true,
        required:true,
      }

  },
  travelTime:{
       from : { type:String,
        required:true,
        trim:true},
        to:{
           type:String,
           required: true,
           trim:true
        }
  },
    ticketPrice: {
      type:Number,
      required:true
    },

createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
},
 availability:{
        type: Boolean,
        default: true,
        required: true
    },
  
},{timestamps:true});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;