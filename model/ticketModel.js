var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URI}`);

const ticketSchema = mongoose.Schema({
    busId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: true
    },
    passengers:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    },
    travelDate: {
        type:Date,
        required:true
    }
    
    
      },
    
{timestapms: true});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;