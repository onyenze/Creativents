const express = require('express');
const router = express.Router();
const  {createTicket,getAllTickets,getTicketById,searchBooking,updateTicketById,deleteTicketById}= require('../controllers/ticketController');
const {userAuth} = require('../middlewares/authMiddleware');

// POST request to create a new ticket
router.post('/tickets/:id',  createTicket);

// GET request to get all tickets
router.get('/tickets', getAllTickets);

// GET request to get a single ticket by ID
router.get('/tickets/:id', getTicketById);

// Endpoint for searching booking with query parameters
router.get('/searchusers/search',searchBooking);



// PUT request to update a ticket by ID
router.put('/updateTicket/:ticketId', updateTicketById);

// DELETE request to delete a ticket by ID
router.delete('/deleteTickets/:id',deleteTicketById);






module.exports = router;