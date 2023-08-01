const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
  } = require('../controllers/eventController');
const { userAuth } = require('../middlewares/authMiddleware');

// POST request to create a new event
router.post('/events', createEvent);

// GET request to retrieve all events
router.get('/events', getAllEvents);

// GET request to retrieve a single event by ID
router.get('/events/:id', getEventById);

// PUT request to update an event by ID
router.put('/events/:id', userAuth, updateEventById);

// DELETE request to delete an event by ID
router.delete('/events/:id', userAuth, deleteEventById);

// POST request to submit a review for an event
// router.post('/events/:eventId/reviews', userAuth, submitReview);

module.exports = router;