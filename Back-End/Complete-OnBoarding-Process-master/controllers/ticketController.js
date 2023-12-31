const bwipjs = require('bwip-js');
const fs = require('fs');
// const puppeteer = require('puppeteer');

const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');
const ticketModel = require('../models/ticketModel');
const userModel = require('../models/userModel');
const {sendEmail} = require('../middlewares/email');
const {createTicketEmail} = require("../utilities/sendingmail/barCode")

// Create a new ticket
const createTicket = async (req, res) => {
    
    try {
      const {  email,ticketQuantity,DOB} = req.body;
      const event = await eventModel.findById(req.params.id)
       // Find the event by its ID
       if (!event) {
         return res.status(404).json({ message: 'Event not found' });
       }

       // Check if the event has available tickets
       if (event.availableTickets === 0) {
        return res.status(400).json({ message: 'Event is sold out. No more tickets available.' });
    }

    // Check if the requested ticket quantity is available
    if (ticketQuantity > event.availableTickets) {
        return res.status(400).json({ message: 'Requested ticket quantity exceeds available tickets' });
    }
       


       const user = await userModel.findOne({email});
      // Calculate the total price of the ticket based on the event price and quantity
      const eventPrice = parseFloat(event.eventPrice);
      let totalPrice = eventPrice * ticketQuantity;
      
      if (eventPrice === 0) {
        // For free admissions, set totalPrice to 0
        totalPrice = 0;
    }
  
      // Create the ticket using the event and user information
      const ticket = new ticketModel({
        email,
        DOB: req.body.DOB || user.DOB,
        ticketQuantity,
        totalPrice,
        link:event,
      })

      

      // Update available tickets for the event
      event.availableTickets -= ticketQuantity;
      if(event.availableTickets === 0){
        await eventModel.findByIdAndUpdate(event._id, {isSoldOut: true})
      }
      event.purchasedTickets.unshift(ticket._id)
       await event.save()

      if(user){// Add the ticket to the user's myTickets array
  user.myticketsLink.unshift(ticket)
        await user.save()
        } 
        

        

        const creator = await userModel.findById(event.createdBy.toString())
        creator.Earnings  += (eventPrice*ticketQuantity)
        creator.totalTicketsSold += parseFloat(ticketQuantity)
        creator.save()
        // the frontend will give you a url to encode after the purchase
       const ticketId = (ticket._id).toString()
       let barcodeData = `https://creativentstca.onrender.com/#/api/barcode/${ticketId}`;
       console.log(ticketId);
      const qrcode = await bwipjs.toBuffer(
        {
          bcid: 'qrcode',
          text: barcodeData,
          scale: 1,
        },
      );
        // Convert the QR code image to a base64 string
      const htmlData = qrcode.toString('base64')
      const qrcodeBase64 = htmlData.replace(/"/g, '');

      ticket.bookingReference = ticketId
        ticket.barcode = htmlData
        await (await ticket.save()).populate("link")

      
      const html =  createTicketEmail(ticketQuantity,ticket.bookingReference,event.eventName, event.eventDescription,event.eventDate,event.eventTime,event.eventVenue,event.eventImages,creator.email) 
      
      const subject = 'Congratulations, Successful Purchased Ticket'
            const datar = {
              email: ticket.email,
              subject,
              html,
};
            sendEmail(
                datar
            );
      res.status(201).json({ message: 'Ticket created successfully', data: ticket
       });
    } catch (error) {
      res.status(500).json({ message: 'Error creating ticket', error: error.message });
    }
  };
  

// Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find()
            .populate('link')
            .exec();
        res.status(200).json({ data: tickets });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tickets', error });
    }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticketModel.findById(id)
            .populate('link')
            
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        
        res.status(200).json({ data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error });
    }
};


// Query search of events
const searchBooking = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    
    // Perform a case-insensitive search on the booking refernce
    const searchResults = await ticketModel.find({
      $or: [
        { bookingReference: { $regex: searchTerm, $options: 'i' } }
      ]
    }).populate("link");
    
    res.status(200).json({ data: searchResults });
  } catch (error) {
    res.status(500).json({ message: 'Error searching booking', error: error.message });
  }
};


// Update a ticket by ID
const updateTicketById = async (req, res) => {
    const { ticketId } = req.params;
    const { ticketQuantity, email } = req.body;
  
    try {
      // Find the ticket by its ID
      const ticket = await ticketModel.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Verify that the ticket belongs to the user making the request
      if (ticket.email !== req.body.email) {
        return res.status(403).json({ message: 'You are not authorized to update this ticket' });
      }
      
      // Get the event associated with the ticket
      const event = await eventModel.findById(ticket.link);

      // Calculate the difference in ticket quantity between the current and updated ticket
      const ticketQuantityDifference = ticketQuantity - ticket.ticketQuantity;

      // Check if there are enough available tickets for the update
      if (event.availableTickets < ticketQuantityDifference) {
          return res.status(400).json({ message: 'Not enough available tickets for the update' });
      }

      // Calculate the total price based on the event price and updated ticket quantity
      const eventPrice = parseFloat(event.eventPrice); // Convert eventPrice to a number
      let totalPrice = eventPrice * ticketQuantity;

      if (eventPrice === 0) {
          // For free admissions, set totalPrice to 0
          totalPrice = 0;
      }

      // Update the ticket with the new ticket quantity and total price
      ticket.ticketQuantity = ticketQuantity;
      ticket.totalPrice = totalPrice;
      await ticket.save();

      // Update the available tickets for the event
      event.availableTickets -= ticketQuantityDifference;
      await event.save();

      // Update the purchasedTickets array for the event
      if (ticketQuantityDifference > 0) {
          event.purchasedTickets.push(ticket);
      } else if (ticketQuantityDifference < 0) {
          event.purchasedTickets = event.purchasedTickets.filter((purchasedTicket) => purchasedTicket._id.toString() !== ticket._id.toString());
      }
      await event.save();
  
      // Populate the referenced 'event' field to get the full event details
      // await ticket.populate('link').execPopulate();
  
      res.status(200).json({ message: 'Ticket updated successfully', data: ticket });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ticket', error: error.message });
    }
  };
  

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticketModel.findByIdAndDelete(id)
            .populate('email')
            .populate('eventPrice')
            .populate('eventDescription')
            .populate('eventName')
            .populate('eventVenue')
            .populate('eventDate')
            .populate('eventTime')
            .populate('eventImages')
            .exec();
        // you have to remove the tickets from Myticketslink if a user is logged in 
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully', data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};





module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    searchBooking,
    updateTicketById,
    deleteTicketById,
};

