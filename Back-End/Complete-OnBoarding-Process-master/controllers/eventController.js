const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const {sendEmail} = require('../middlewares/email')


// Create a new event
const createEvent = async (req, res) => {
  try {
    // User is authenticated, continue with event creation
    
    const user = await userModel.findById(req.userId).exec()
    // Check if the user is authenticated
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up to create an event.' });
    }
 
    const {
      eventDescription,eventName,eventPrice,eventLocation,eventVenue,eventDate,eventCategory,eventTime} = req.body
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

    const newEvent = new eventModel({
      createdBy:user,
        eventDescription,
        eventName,
        eventLocation,
        eventCategory,
        eventPrice,
        eventVenue,
        eventDate,
        eventTime,
        eventImages: imageUrls,
        public_id: publicIds
      })
    
    
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
    const events = await eventModel.find().populate("createdBy").exec();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id).populate("createdBy").exec();
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
        query.eventPrice = event_Price
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
    const userId = req.userId;
    console.log(userId)
    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. User is not logged in' });
    }

    const user = await userModel
  .findById(req.userId)
  // .select('firstname lastname email myEventsLink')
  // .lean()
  // .populate('myEventsLink').exec();
;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { eventID } = req.params; // Assuming you pass the event ID in the URL parameter


    // Find the existing event by its ID
    const existingEvent = await eventModel.findById(eventID);
    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log(existingEvent.createdBy.toString());
    // Check if the logged-in user is the creator of the event
    if (existingEvent.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized. Only the event creator can update the event' });
    }
    // Update the event details with the new data from the request body
    const {      
      eventDescription,
      eventName,
      eventPrice,
      eventLocation,
      eventVenue,
      eventDate,
      eventTime,
    } = req.body;

    // Manually update the fields that are provided in the request body
    existingEvent.createdBy = user;
    existingEvent.eventDescription = eventDescription || existingEvent.eventDescription;
    existingEvent.eventName = eventName || existingEvent.eventName;
    existingEvent.eventPrice = eventPrice || existingEvent.eventPrice;
    existingEvent.eventLocation = eventLocation || existingEvent.eventLocation;
    existingEvent.eventVenue = eventVenue || existingEvent.eventVenue;
    existingEvent.eventDate = eventDate || existingEvent.eventDate;
    existingEvent.eventTime = eventTime || existingEvent.eventTime;
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

// Find the index of the existing event in the myEventsLink array
const eventIndex = user.myEventsLink.findIndex((event) => event._id.toString() === existingEvent._id.toString());

// If the event is not found in the array, push it as a new entry
if (eventIndex === -1) {
  user.myEventsLink.push(existingEvent);
} else {
  // If the event is found, update it with the new data
  user.myEventsLink[eventIndex] = existingEvent;
}
// Save the updated user
await user.save();


    res.status(200).json({ message: 'Event updated successfully', data: existingEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

  

// Delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. User is not logged in' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { eventID } = req.params; // Assuming you pass the event ID in the URL parameter

    // Find the event by its ID
    const eventToDelete = await eventModel.findById(eventID);
    if (!eventToDelete) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the event belongs to the logged-in user
    if (!user.myEventsLink.includes(eventID)) {
      return res.status(403).json({ message: 'Forbidden. You are not allowed to delete this event' });
    }

    // Delete event images from Cloudinary
    if (eventToDelete.public_id && eventToDelete.public_id.length > 0) {
      for (const publicId of eventToDelete.public_id) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete the event from the database
    const deletedEvent = await eventModel.findByIdAndDelete(eventID);

    // Remove the event from the user's myEventsLink array
    user.myEventsLink.pull(deletedEvent);
    await user.save();

    res.status(200).json({ message: 'Event deleted successfully', data: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

  


const submitReview = async (req, res) => {
  const eventId = req.params.eventID;
  const { rating, reviewText } = req.body;

  try {
    const userId = req.userId;

    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. User is not logged in' });
    }

    // Find the event in the database
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await userModel.findById(userId);
    console.log(user);
    // Check if the user has purchased a ticket for this event
    if (!user.myticketsLink.includes(eventId)) {
      return res.status(401).json({ message: 'Unauthorized. You must purchase a ticket for this event to submit a review' });
    }


    // Update the attendee name using user's firstname and lastname
    const attendeeName = `${user.firstname} ${user.lastname}`;

    // Check if the user has already submitted a review for this event
    const existingReview = event.reviews.find((review) => review.attendeeName === attendeeName);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already submitted a review for this event' });
    }

    // Add the new review to the event's reviews array
    event.reviews.push({
      attendeeId:userId,
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
    res.status(500).json({ message: 'Error submitting review'+ error.message });
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
