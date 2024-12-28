const Bus = require("../model/busModel");
const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");


const createBus = async (req, res) => {
    const {busType, operator, route, travelTime, stoppage, ticketPrice, totalSeats, model} = req.body;
    try {
     if(!busType || !operator || !route || !travelTime || !stoppage || !ticketPrice || !totalSeats || !model){
         return res.status(303).json({msg:'all fields are required'});
     }

     var seats;
     if(typeof totalSeats !== 'number'){
         seats = parseInt(totalSeats);
     }else{
         seats = totalSeats;
     }
     const bus = await Bus.create({
        createdBy:req.id,
        busType,
        model,
        operator,
        ticketPrice,
        route:{
         startFrom:route.startFrom,
         endTo: route.endTo
        },
        totalSeats:seats,
        travelTime:{
         from:travelTime.from,
         to:travelTime.to
        },
        stoppage: stoppage || [],

     })
     
     if(!bus){
         return res.json({msg:'bus not created'});
     }
     return res.status(201).json({msg:'successfully', result:bus});
    } catch (error) {
    
     return res.status(501).json({
         msg:'internal server error'
     })
    }
};

const updateBus = async (req, res)=> {
    try {
        const id = req.params.id;
        var obj = {};
        const {busType, operator, route, travelTime, stoppage, ticketPrice, model, availability} = req.body;
        // here add some functionality for fill the obj to update with it;
        if(busType !== undefined){
            obj.busType = busType
        }

        if(model !== undefined){
            obj.model = model
        }
        
        if(operator !== undefined){
            obj.operator = operator
        }

        if(route !== undefined){
            obj.route = route
        }

        if(travelTime !== undefined){
            obj.travelTime = travelTime
        }

        if(stoppage !== undefined){
            obj.stoppage = stoppage
        }

        if(ticketPrice !== undefined){
            obj.ticketPrice = ticketPrice
        }
        
        if(availability !== undefined){
            obj.availability = availability
        }

        const updated = await Bus.findByIdAndUpdate({_id:id}, obj);
        if(!updated){
            return res.status(401).json({msg:'update failed'});
        }

        return res.status(201).json({msg:'update successfull', result:updated});

    } catch (error) {
        return res.status(500).json({
            msg:'internal server error'
        })
    }
   }

const deleteBus = async(req, res)=> {
    try {
        const id = req.params.id;
        const busDelete = await Bus.findByIdAndDelete(id);
        if(!busDelete){
            return res.status(404).json({msg:'request failed'});
        }

        return res.status(201).json({msg:'successfully deleted'});
    } catch (error) {
        return res.status(500).json({
            msg:'internal server error'
        })
    }
   }

   const createTicket = async (req, res)=> {
    try {
        const {busId, travelDate} = req.body;
        const ticket = await Ticket.create({
            busId,travelDate,
        })

        if(!ticket){
            return res.status(401).json({msg:'request failed'});
        }

        return res.status(201).json({
            msg:'ticket published successfull', result: ticket
        })
    } catch (error) {
        
        return res.status(500).json({
            msg:'internal server error'
        })
    }
   }

   const updateTicket = async (req, res)=> {
    try {
        const ticketId = req.params.id;
        const {travelDate, passengers} = req.body;
        var obj = {};

        if(travelDate !== undefined){
            obj.travelDate = travelDate
        }

        if(passengers !== undefined){
            obj.passengers = passengers
        }

        const updated = await Ticket.findByIdAndDelete(ticketId, obj);

        if(!updated){
            return res.status(404).json({
                msg:'request failed'
            });
        }

        return res.status(201).json({msg:'update successfull'});

    } catch (error) {
        return res.status(500).json({msg:'internal server error'})
    }
   }

   const deleteTicket =  async (req, res)=> {
    try {
        const ticketId = req.params.id;
        const deleted = await Ticket.findByIdAndDelete(ticketId);

        if(!deleted){
            return res.status(401).json({
                msg:'request failed'
            });
            
        }

        return res.status(201).json({msg:'successfully deleted'});
    } catch (error) {
        return res.status(500).json({msg:'internal server error'});
    }
   }

module.exports = {createBus, updateBus, deleteBus, createTicket, updateTicket, deleteTicket}