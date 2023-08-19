const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const ticketModel = require("../models/ticketModel")
const {sendEmail} = require('../middlewares/email')
const {createEventEmail} = require("../utilities/sendingmail/createEvent")
const {updateEventEmail} = require("../utilities/sendingmail/updateEvent")

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
      eventDescription,eventName,eventPrice,eventLocation,eventVenue,availableTickets,eventDate,eventCategory,eventTime} = req.body

          let result = null;

          if (req.files) {
            result= await cloudinary.uploader.upload(
              req.files.eventImages.tempFilePath,{folder:"eventImages"},
              (err, eventImages) => {
                try {
                  return eventImages;
                } catch (err) {
                  return err;
                }
              }
            );
          } 

    const newEvent = new eventModel({
      createdBy:user._id,
        eventDescription,
        availableTickets,
        eventName,
        eventLocation,
        eventCategory,
        eventPrice,
        eventVenue,
        eventDate,
        eventTime,
        eventImages: result.secure_url,
        public_id: result.public_id
      }) 
  
    // save  the corresponding input into the database
    const savedEvent = await (await newEvent.save()).populate("createdBy")
    user.myEventsLink.unshift(newEvent)
    await user.save()
    const html = createEventEmail(eventName, eventDescription,eventDate,eventTime,eventVenue,result.secure_url)
      const subject = "Event Created Sucessfully"
      sendEmail({
        email:user.email,
        subject,
        html 
    });

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
        query.eventVenue = event_Venue;
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
      availableTickets,
    } = req.body;


    let result = null;

    if (req.files) {
      if (existingEvent.eventImages) {
        await cloudinary.uploader.destroy(existingEvent.public_id);
      }
      result= await cloudinary.uploader.upload(
        req.files.eventImages.tempFilePath,{folder:"eventImages"},
        (err, eventImages) => {
          try {
            return eventImages;
          } catch (err) {
            return err;
          }
        }
      );
    } 
    
    // Manually update the fields that are provided in the request body
    existingEvent.createdBy = user;
    existingEvent.eventDescription = eventDescription || existingEvent.eventDescription;
    existingEvent.eventName = eventName || existingEvent.eventName;
    existingEvent.eventPrice = eventPrice || existingEvent.eventPrice;
    existingEvent.eventLocation = eventLocation || existingEvent.eventLocation;
    existingEvent.eventVenue = eventVenue || existingEvent.eventVenue;
    existingEvent.eventDate = eventDate || existingEvent.eventDate;
    existingEvent.eventTime = eventTime || existingEvent.eventTime;
    existingEvent.availableTickets = availableTickets || existingEvent.availableTickets;
    existingEvent.eventImages = result.secure_url || existingEvent.eventImages;
    existingEvent.public_id = result.public_id || existingEvent.public_id;


    if(existingEvent.availableTickets > 0){
      await eventModel.findByIdAndUpdate(existingEvent._id, {isSoldOut: false},{new:true})
    }
    // Save the updated event
    await existingEvent.save();



// Find the index of the existing event in the myEventsLink array
const eventIndex = user.myEventsLink.findIndex((event) => event._id.toString() === existingEvent._id.toString());

// If the event is not found in the array, push it as a new entry
if (eventIndex === -1) {
  user.myEventsLink.unshift(existingEvent);
} else {
  // If the event is found, update it with the new data
  user.myEventsLink[eventIndex] = existingEvent;
}

const ticketIds = existingEvent.purchasedTickets.map(ticket => ticket._id.toString());
// Query ticket model to get email addresses of users who purchased tickets
const tickets = await ticketModel.find({ _id: { $in: ticketIds } }, 'ticket', (err, tickets) => {
  if (err) {
      console.error('Error querying ticket model:', err);
      return;
  }
  // Send email notifications to each user's email address
  const transporter = nodemailer.createTransport({
    /* Configure your email transporter */
});

tickets.forEach(ticket => {
    const mailOptions = {
        from: 'chibuezeonyenze123@gmail.com',
        to: ticket.email,
        subject: 'Event Update Notification',
        text: 'The event you purchased a ticket for has been updated. Check the details.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});
});

console.log(ticketIds);
const html = updateEventEmail(eventName, eventDescription,eventDate,eventTime,eventVenue,result.secure_url)
const subject = "Event Updated Sucessfully"
sendEmail({
  email:user.email,
  subject,
  html 
});
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
    
    const myticketsLink = user.myticketsLink; // Array of ObjectId references to tickets
    const purchasedTickets = event.purchasedTickets; // Array of ObjectId references to tickets

// Function to check if a ticket ObjectId exists in an array
  const hasCommonTicket = (array1, array2) => {
    return array1.some(ticketId1 => {
      return array2.some(ticketId2 => ticketId1.equals(ticketId2));
  });
};

// Check if there's a common ticket ObjectId between the two arrays
const hasCommonTicketId = hasCommonTicket(myticketsLink, purchasedTickets);

if (!hasCommonTicketId) {
  // User has not purchased a ticket and cannot pass reviews on the event
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
    event.reviews.unshift({
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

const getEventReviews = async (req, res) => {
  const eventId = req.params.eventID;

  try {
    // Find the event in the database
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Populate attendee information from userModel for each review
    await event.populate('reviews.attendeeId', 'firstname lastname profilePicture')
    // Extract the relevant details for each review
    const reviewsWithAttendees = event.reviews.map((review) => {
      const attendee = review.attendeeId;
      return {
        attendeeName: `${attendee.firstname} ${attendee.lastname}`,
        attendeeProfilePicture: attendee.profilePicture,
        rating: review.rating,
        reviewText: review.reviewText,
      };
    });

    res.status(200).json({ reviews: reviewsWithAttendees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews: ' + error.message });
  }
};



const getUserWithLinks = async (req,res) => {
  try {
    const userId = req.params.id
    const user = await userModel.findById(userId)
      .populate('bookmarks')
      .populate('myEventsLink')
      .populate({
        path: 'myticketsLink',
        populate: {
          path: 'link', // Assuming you have a field named `ticketId` in `myticketsLink`
          model: 'event' // Replace with the actual model name of your Ticket
        }
      });

      res.status(200).json({ data: user });
  } catch (error) {
    throw new Error('Error fetching user with linked fields: ' + error.message);
  }
};


const promoteEvent = async (req, res) => {
  const { eventId } = req.params;
  const loggedInUserId = req.userId; // Assuming you have a field 'userId' in your request object

  try {
    // Find the event by ID and check if it belongs to the logged-in user
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the event's createdBy matches the logged-in user's ID
    if (event.createdBy.toString() !== loggedInUserId) {
      return res.status(403).json({ message: 'Unauthorized. You can only promote events that you created' });
    }

    // Update isPromoted to true
    event.isPromoted = true;
    await event.save();

    res.status(200).json({ message: 'Event promoted successfully', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Error promoting event', error: error.message });
  }
};


const getPromotedEvents = async (req, res) => {
  try {
    const promotedEvents = await eventModel.find({ isPromoted: true }).populate('createdBy').exec();
    res.status(200).json({ data: promotedEvents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promoted events', error: error.message });
  }
};

const bookmarkEvent = async (req, res) => {
  const {eventId} = req.params;

  try {
    // User is authenticated, continue with event creation
    
    const user = await userModel.findById(req.userId).exec()
    // Check if the user is authenticated
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up to create an event.' });
    }

    // Find the ticket by its ID
    const event = await ticketModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'event not found' });
    }

    // Check if the ticket is already bookmarked by the user
    if (user.bookmarks.includes(eventId)) {
      return res.status(400).json({ message: 'Event is already bookmarked' });
    }

    // Add the ticket ID to the user's bookmarks array
    user.bookmarks.unshift(eventId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Event bookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error bookmarking Event', error: error.message });
  }
};

module.exports = {
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
  getPromotedEvents,
  bookmarkEvent
};
