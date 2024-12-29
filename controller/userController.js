const Bus = require("../model/busModel");
const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");

const viewTicket = async (req, res) => {
    try {
       
        const availableTickets = await Ticket.aggregate([
            {
                $lookup: {
                    from: "buses",
                    localField: "busId", 
                    foreignField: "_id", 
                    as: "busDetails" 
                }
            },
          
            { $unwind: "$busDetails" },
 
            {
                $addFields: {
                    passengersCount: { $size: "$passengers" }
                }
            },
       
            {
                $match: {
                    $expr: { $lt: ["$passengersCount", "$busDetails.totalSeats"] }
                }
            },
   
            {
                $project: {
                    _id: 1,
                    busId: 1,
                    travelDate: 1,
                    passengersCount: 1,
                    "busDetails.busType": 1,
                    "busDetails.model": 1,
                    "busDetails.totalSeats": 1
                }
            }
        ]);

    
        if (!availableTickets.length) {
            return res.status(204).json({ message: "No available tickets found" });
        }
    
       return res.status(200).json(availableTickets);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const viewBus = async (req, res)=> {
    try {
          const buses = await Bus.find({availability: true});
          if(buses.length === 0){
                return res.status(204).json({msg:'currently no buses available'});
          }

          return res.status(200).json({msg:`${buses.length} buses are available right now`, result:buses });
    } catch (error) {
        
          return res.status(500).json({
                msg:'internal server error'
          })
    }
}

const purchaseTicket = async (req, res) => {
    try {
        const userId = req.id;  
        const { ticketId, passenger } = req.body; 

        


        if (passenger > 4) {
            return res.status(400).json({ msg: 'Please book for 4 or fewer passengers' });
        }

        // Create an array of userIds equal to the passenger count
        const userIdsToPush = Array(passenger).fill(userId); // Example: [userId, userId, userId]

       
        const purchased = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $push: { 
                    passengers: { 
                        $each: userIdsToPush 
                    } 
                }
            },
            { new: true }
        );

       
        return res.status(201).json({ msg: "Ticket booked successfully", result: purchased });
        
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
module.exports = {viewTicket, viewBus, purchaseTicket}