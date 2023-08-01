const Ticket = require('../models/ticketModel');

// Create a new ticket
const createTicket = async (req, res) => {
    const { email, ticketQuantity, eventPrice, eventDescription, eventName, eventVenue, eventDate, eventTime, eventImages } = req.body;
    try {
        const ticket = await Ticket.create({
            email,
            ticketQuantity,
            eventPrice,
            eventDescription,
            eventName,
            eventVenue,
            eventDate,
            eventTime,
            eventImages
        });
        res.status(201).json({ message: 'Ticket created successfully', data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
    }
};

// Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
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
        const ticket = await Ticket.findById(id)
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
        res.status(200).json({ data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error });
    }
};

// Update a ticket by ID
const updateTicketById = async (req, res) => {
    const { id } = req.params;
    const ticketData = req.body;
    try {
        const ticket = await Ticket.findByIdAndUpdate(id, ticketData, { new: true })
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
        res.status(200).json({ message: 'Ticket updated successfully', data: ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndDelete(id)
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

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
};

