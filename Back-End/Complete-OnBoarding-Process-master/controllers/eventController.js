const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');


// Create a new event
const createEvent = async (req, res) => {
  try {
    const user = userModel.findById(req.userId)
    const {username,eventDescription,eventName,eventPrice,eventLocation,eventVenue,eventDate,eventCategory,eventTime} = req.body
    const imageUrls = []
    const publicIds = []

    // checks if the user is passing an image 
    if (req.files && req.files.eventImages) {
        // iterates over the images being uploaded and get their paths
        for (const image of req.files.eventImages) {
            // uploads the images to the cloudinary storage
            const file = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'eventImages' });
            //   pushes the image urls and public ids into the arrays created above
            imageUrls.push(file.secure_url);
            publicIds.push(file.public_id);
        }
    }

    const newEvent = new eventModel({username,
        eventDescription,
        eventName,
        eventLocation,
        eventCategory,
        eventPrice,
        eventVenue,
        eventDate,
        eventTime,
        eventImages: imageUrls,
        public_id: publicIds})
    


    // save  the corresponding input into the database
    const savedEvent = await newEvent.save()

    user.myEventsLink.push(newEvent)
    await user.save()

    res.status(201).json({ message: 'Event created successfully', data: savedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

const searchEvents = async (req, res) => {
    try {
      const { user_name,
        event_Name,
        event_Category,
        event_Price,
        event_Location,
        event_Datestart,
        event_Venue,
        event_Date, } = req.query;
      // Customize your database query based on the provided query parameters
      const query = {};
  
      if (user_name) {
        query.username = user_name;
      }
      
      if (event_Category) {
        query.eventCategory = event_Category;
      }
      
      if (event_Name) {
        query.eventName = event_Name;
      }
  
      if (event_Date) {
        query.eventDate = event_Date
      }
  
      if (event_Datestart) {
        query.eventDate = { $gte: new Date(event_Datestart) };
      }
  
      if (event_Location) {
        query.eventLocation = event_Location;
      }

      if (event_Venue) {
        query.event_Venue = event_Venue;
      }

      if (event_Price) {
        query.eventPrice = event_Price;
      }

  
      const events = await eventModel.find(query);
      
      if (events.length === 0) {
        return res.status(404).json({ message: 'No events found for the provided criteria' });
      }
  
      res.status(200).json({ data: events });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  };
  


// Update an event by ID
const updateEventById = async (req, res) => {
    try {
      const user = userModel.findById(req.userId)
      const { eventID } = req.params; // Assuming you pass the event ID in the URL parameter
  
      // Find the existing event by its ID
      const existingEvent = await eventModel.findById(eventID);
      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Update the event details with the new data from the request body
      const {
        username,
        eventDescription,
        eventName,
        eventPrice,
        eventLocation,
        eventVenue,
        eventDate,
        eventTime,
      } = req.body;
  
      existingEvent.username = username;
      existingEvent.eventDescription = eventDescription;
      existingEvent.eventName = eventName;
      existingEvent.eventPrice = eventPrice;
      existingEvent.eventLocation = eventLocation;
      existingEvent.eventVenue = eventVenue;
      existingEvent.eventDate = eventDate;
      existingEvent.eventTime = eventTime;
  
      // Save the updated event
      await existingEvent.save();
  
      // Check if there are new event images to add
      if (req.files && req.files.eventImages) {
        const newImageUrls = [];
        const newPublicIds = [];
  
        for (const image of req.files.eventImages) {
          const file = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'eventImages',
          });
          newImageUrls.push(file.secure_url);
          newPublicIds.push(file.public_id);
        }
  
        // Add the new image URLs and public IDs to the existing event's eventImages array
        existingEvent.eventImages.push(...newImageUrls);
        existingEvent.public_id.push(...newPublicIds);
  
        // Save the updated event with the new images
        await existingEvent.save();

      }
      user.myEventsLink.push(existingEvent)
      await user.save()
      res.status(200).json({ message: 'Event updated successfully', data: existingEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error: error.message });
    }
  };
  

// Delete an event by ID
const deleteEventById = async (req, res) => {
    try {
      const user = userModel.findById(req.userId)
      const { eventID } = req.params; // Assuming you pass the event ID in the URL parameter
  
      // Find the event by its ID
      const eventToDelete = await eventModel.findById(eventID);
      if (!eventToDelete) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Delete event images from Cloudinary
      if (eventToDelete.public_id && eventToDelete.public_id.length > 0) {
        for (const publicId of eventToDelete.public_id) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
  
      // Delete the event from the database
      const deletedEvent = await eventModel.findByIdAndDelete(eventID);

      user.myEventsLink.pull(deletedEvent)
      await user.save()
  
      res.status(200).json({ message: 'Event deleted successfully', data:deletedEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
  };
  


const submitReview = async (req, res) => {
    const eventId = req.params.id
    const { attendeeName, rating, reviewText } = req.body;

    try {
      attendeeName = `${user.firstname} ${user.lastname}`
      const user = userModel.findById(req.userId)
      // Find the event in the database
      const event = await eventModel.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Add the new review to the event's reviews array
      event.reviews.push({
        attendeeName,
        rating,
        reviewText,
      });
  
      // Calculate the updated overall rating
      const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0);
      event.overallRating = totalRating / event.reviews.length;
  
      // Save the updated event data
      await event.save();
  
      res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review' });
    }
  };

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  searchEvents,
  updateEventById,
  deleteEventById,
  submitReview
};
