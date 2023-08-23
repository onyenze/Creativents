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
    promoteEvent,
    bookmarkEvent,
    getPromotedEvents,
    unbookmarkEvent,
    requestDelete
  } = require('../controllers/eventController');
const { userAuth } = require('../middlewares/authMiddleware');


// POST request to create a new event
router.post('/events',userAuth, createEvent);

// GET request to retrieve all events
router.get('/events', getAllEvents);

// GET request to retrieve a single event by ID
router.get('/events/:id', getEventById);

// Endpoint for searching events with query parameters
router.get('/event/search', searchEvents);

// PUT request to update an event by ID
router.put('/update/:eventID', userAuth, updateEventById);

// DELETE request to delete an event by ID
router.delete('/Delete/:eventID', userAuth, deleteEventById);

// Route to request Delete by user
router.put("/requestDelete/:id",userAuth,requestDelete)

// POST request to submit a review for an event
router.post('/events/:eventID/review', userAuth, submitReview);

// GET request to get all event reviews
router.get('/events/:eventID/reviews', getEventReviews);

// GET request to get all event reviews
router.get('/getUserWithLinks/:id', getUserWithLinks);

// Route to promote an event
router.post('/events/promote/:eventId',userAuth,promoteEvent)

// Route to get all promoted events
router.get('/promoted', getPromotedEvents);

// Route to bookmark an event
router.put('/users/bookmarks/:eventId', userAuth,bookmarkEvent);

// Route to bookmark an event
router.put('/users/unbookmarks/:eventId', userAuth,unbookmarkEvent);

module.exports = router;