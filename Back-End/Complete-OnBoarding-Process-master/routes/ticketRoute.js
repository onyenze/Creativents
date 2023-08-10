const express = require('express');
const router = express.Router();
const  {createTicket,getAllTickets,getTicketById,updateTicketById,deleteTicketById,bookmarkTicket,promoteEvent}= require('../controllers/ticketController');
const {userAuth} = require('../middlewares/authMiddleware');

// POST request to create a new ticket
router.post('/tickets/:id',  createTicket);

// GET request to get all tickets
router.get('/tickets', getAllTickets);

// GET request to get a single ticket by ID
router.get('/tickets/:id', getTicketById);

// PUT request to update a ticket by ID
router.put('/tickets/:ticketId', updateTicketById);

// DELETE request to delete a ticket by ID
router.delete('/tickets/:id',deleteTicketById);

router.put('/users/bookmarks/:ticketId', userAuth,bookmarkTicket);

// Route to promote an event
router.post('/events/promote/:eventId',promoteEvent)


module.exports = router;