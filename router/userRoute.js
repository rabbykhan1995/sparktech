const Bus = require('../model/busModel');
const Ticket = require('../model/ticketModel');
const User = require('../model/userModel');
var express = require('express');
var router = express.Router();

router
      .get('/', (req, res)=> {
         return res.json({msg:'this is user route'});
      })
      .get('/buses', async (req, res)=> {
            try {
                  const buses = await Bus.find({availability: true});
                  if(buses.length === 0){
                        return res.json({msg:'currently no buses available'});
                  }

                  return res.status(200).json({msg:`${buses.length} buses are available right now`, result:buses });
            } catch (error) {
                
                  return res.status(500).json({
                        msg:'internal server error'
                  })
            }
      })

      .get('/tickets', async (req, res) => {
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
                    return res.status(404).json({ message: "No available tickets found" });
                }
            
               return res.status(200).json(availableTickets);
            } catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        })

module.exports = router;