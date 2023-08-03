const bwipjs = require('bwip-js');
const eventModel = require('../models/eventModel');
const ticketModel = require('../models/ticketModel');
const userModel = require('../models/userModel');

// Create a new ticket
const createTicket = async (req, res) => {
    
    try {
      const {  email, ticketQuantity,DOB} = req.body;
      const event = await eventModel.findById(req.params.id)
       // Find the event by its ID
       if (!event) {
         return res.status(404).json({ message: 'Event not found' });
       }
      
      // Calculate the total price of the ticket based on the event price and quantity
      const eventPrice = event.eventPrice;
      const totalPrice = eventPrice * ticketQuantity;
  
      // Create the ticket using the event and user information
      const ticket = await  new ticketModel({
        email,
        DOB,
        ticketQuantity,
        eventPrice,
        totalPrice,
        link:event,
      })

      await ticket.save()

      const barcodeData = `${ticket._id}|${ticket.link}|${ticket.email}`;
      const qrcode = await bwipjs.toBuffer(
        {
          bcid: 'qrcode',
          text: barcodeData,
          scale: 3,
        },
        // (err, png) => {
        //   if (err) {
        //     return res.status(500).json({ message: 'Error generating QR code' });
        //   }
        //   res.set('Content-Type', 'image/png');
        //   res.send(qrcode);
        // }
      );
        // Convert the QR code image to a base64 string
      const qrcodeBase64 = qrcode.toString('base64');
      res.status(201).json({ message: 'Ticket created successfully', data: ticket,data2:qrcodeBase64 });
    } catch (error) {
      res.status(500).json({ message: 'Error creating ticket', error: error.message });
    }
  };
  

// Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find()
            .populate('email')
            .populate('eventPrice')
            .populate('eventDescription')
            .populate('eventName')
            .populate('eventVenue')
            .populate('eventDate')
            .populate('eventTime')
            .populate('eventImages')
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
            // .populate('email')
            // .populate('eventPrice')
            // .populate('eventDescription')
            // .populate('eventName')
            // .populate('eventVenue')
            // .populate('eventDate')
            // .populate('eventTime')
            // .populate('eventImages')
            // .exec();
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        const linkedEvent = ticket.link
        const eventTicket = await eventModel.findById(linkedEvent)
        res.status(200).json({ data: ticket,event:eventTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error });
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
  
      // Calculate the total price based on the event price and updated ticket quantity
      const eventPrice = ticket.eventPrice;
      const totalPrice = eventPrice * ticketQuantity;
  
      // Update the ticket with the new ticket quantity and total price
      ticket.ticketQuantity = ticketQuantity;
      ticket.totalPrice = totalPrice;
      await ticket.save();
  
      // Populate the referenced 'event' field to get the full event details
      await ticket.populate('event').execPopulate();
  
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
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully', data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};

const bookmarkTicket = async (req, res) => {
  const { userId, ticketId } = req.params;

  try {
    // Find the user by their ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the ticket by its ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if the ticket is already bookmarked by the user
    if (user.bookmarks.includes(ticketId)) {
      return res.status(400).json({ message: 'Ticket is already bookmarked' });
    }

    // Add the ticket ID to the user's bookmarks array
    user.bookmarks.push(ticketId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Ticket bookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error bookmarking ticket', error: error.message });
  }
};


module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,bookmarkTicket,
};

