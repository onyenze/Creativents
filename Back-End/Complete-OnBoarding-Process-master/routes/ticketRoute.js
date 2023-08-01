const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST request to create a new ticket
router.post('/tickets', authMiddleware.userAuth, ticketController.createTicket);

// GET request to get all tickets
router.get('/tickets', ticketController.getAllTickets);

// GET request to get a single ticket by ID
router.get('/tickets/:id', ticketController.getTicketById);

// PUT request to update a ticket by ID
router.put('/tickets/:id', authMiddleware.userAuth, ticketController.updateTicketById);

// DELETE request to delete a ticket by ID
router.delete('/tickets/:id', authMiddleware.userAuth, ticketController.deleteTicketById);

module.exports = router;