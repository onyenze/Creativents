const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    getEventById,
    searchEvents,
    updateEventById,
    deleteEventById,
    submitReview,
    getEventReviews,
    getUserWithLinks,
    promoteEvent
  } = require('../controllers/eventController');
const { userAuth } = require('../middlewares/authMiddleware');

// POST request to create a new event
router.post('/events',userAuth, createEvent);

// GET request to retrieve all events
router.get('/events', getAllEvents);

// GET request to retrieve a single event by ID
router.get('/events/:id', getEventById);

// Endpoint for searching events with query parameters
router.get('/events/search', searchEvents);

// PUT request to update an event by ID
router.put('/event/:eventID', userAuth, updateEventById);

// DELETE request to delete an event by ID
router.delete('/Events/:eventID', userAuth, deleteEventById);

// POST request to submit a review for an event
router.post('/events/:eventID/review', userAuth, submitReview);

// GET request to get all event reviews
router.get('/events/:eventID/reviews', getEventReviews);

// GET request to get all event reviews
router.get('/getUserWithLinks/:id', getUserWithLinks);

// Route to promote an event
router.post('/events/promote/:eventId',promoteEvent)

module.exports = router;