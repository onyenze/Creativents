const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const ticketModel = require("../models/ticketModel")
const {sendEmail} = require('../middlewares/email')
const {createEventEmail} = require("../utilities/sendingmail/createEvent")
const {updateEventEmail} = require("../utilities/sendingmail/updateEvent")
const {requestDeleteEmail} = require("../utilities/sendingmail/requestDelete")
const {updatedTicketEmail} = require("../utilities/sendingmail/updateTicket")
const {adminDelete} = require("../utilities/sendingmail/adminDelete")


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
    const link = `https://creativentstca.onrender.com/#/api/events/promote/${newEvent._id}`
    const html = createEventEmail(eventName, eventDescription,eventDate,eventTime,eventVenue,result.secure_url,link)
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

// Query search of events
const searchEvents = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    
    // Perform a case-insensitive search on event names and descriptions
    const searchResults = await eventModel.find({
      $or: [
        { eventName: { $regex: searchTerm, $options: 'i' } },
        {
          $expr: {
            $eq: [
              { $toString: "$eventPrice" }, // Convert eventPrice to string for comparison
              searchTerm
            ]
          }
        },
        { eventLocation: { $regex: searchTerm, $options: 'i' } },
        { eventVenue: { $regex: searchTerm, $options: 'i' } },
        { eventDate: { $regex: searchTerm, $options: 'i' } },
        { eventTime: { $regex: searchTerm, $options: 'i' } },
        { eventCategory: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    
    res.status(200).json({ data: searchResults });
  } catch (error) {
    res.status(500).json({ message: 'Error searching events', error: error.message });
  }
};


// Update an event by ID
const updateEventById = async (req, res) => {
  try {
    const userId = req.userId;
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
    existingEvent.isToBeDeleted = false
    if (req.files){
      existingEvent.eventImages = result.secure_url 
    existingEvent.public_id = result.public_id 
    } else {
      existingEvent.eventImages =  existingEvent.eventImages;
      existingEvent.public_id =  existingEvent.public_id;
    }
    


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
// Use async/await for better readability
async function getUsersDetails(ticketIds) {
  try {
      const tickets = await ticketModel.find({ _id: { $in: ticketIds } }); // Find tickets with matching IDs
      return tickets; // Return the array of ticket' details
  } catch (error) {
      console.error('Error fetching tickets:', error);
      return []; // Return an empty array if there's an error
  }
}

// Call the function and handle the result
const fulldetails =  await getUsersDetails(ticketIds)

  // Extract email values from fulldetails array
const emailArray = fulldetails.map(item => item.email);
// Create a Set to track unique email addresses
const uniqueEmails = new Set();

// Loop through the user's tickets and add unique emails to the Set
emailArray.forEach(email => {
  uniqueEmails.add(email);
});
// Convert the Set back to an array of unique emails
const emailsToSend = Array.from(uniqueEmails);

const organizersEmail = user.email
// Loop through the emailArray and send email to each unique recipient
emailsToSend.forEach(email => {
  sendEmail({
    email,
    subject:"Event Update",
    html:updatedTicketEmail(existingEvent.eventName, existingEvent.eventDescription,existingEvent.eventDate,existingEvent.eventTime,existingEvent.eventVenue,existingEvent.eventImages,organizersEmail)
  });
});
const ticketHoldersLength = emailsToSend.length
const link = `https://creativentstca.onrender.com/#/api/event/promote/${eventId}`
const html = updateEventEmail(ticketHoldersLength,link,existingEvent.eventName, existingEvent.eventDescription,existingEvent.eventDate,existingEvent.eventTime,existingEvent.eventVenue,existingEvent.eventImages)

sendEmail({
  email:user.email,
  subject:"Event Updated Sucessfully",
  html 
});
// Save the updated user
await user.save();


    res.status(200).json({ message: 'Event updated successfully', data: existingEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
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

    // Permit them if they are the ones that created the event
    if (existingReview && !(event.createdBy.toString()===userId)) {
      return res.status(400).json({ message: 'You have already submitted a review for this event' });
    }

    // Add the new review to the event's reviews array
    event.reviews.unshift({
      attendeeId:userId,
      userPicture:user.profilePicture,
      attendeeName,
      rating,
      reviewText,
    });

    // Calculate the updated overall rating
    const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0);
    event.overallRating = totalRating / event.reviews.length;

    // Save the updated event data
    await event.save();

    res.status(200).json({ 
      data: event.reviews,
      overallRating:event.overallRating,
      message: 'Review submitted successfully' });
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
      .populate('following')
      .populate('followers')
      .populate({
        path: 'myticketsLink',
        populate: {
          path: 'link', // to populate a field in a field
          model: 'event' // the model of the field to populate
        }
      });

      res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({message:'Error fetching user with linked fields: ' + error.message});
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

    // Find the event by its ID
    const event = await eventModel.findById(eventId);
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

const unbookmarkEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    // User is authenticated, continue with unbookmarking
    
    const user = await userModel.findById(req.userId).exec()
    // Check if the user is authenticated
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up.' });
    }

    // Find the event by its ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the event is bookmarked by the user
    if (!user.bookmarks.includes(eventId)) {
      return res.status(400).json({ message: 'Event is not bookmarked' });
    }

    // Remove the event ID from the user's bookmarks array
    user.bookmarks = user.bookmarks.filter(bookmarkId => bookmarkId !== eventId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Event unbookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unbookmarking Event', error: error.message });
  }
};


const requestDelete = async(req,res) => {
  try {
    const user = await userModel.findById(req.userId).exec()
    if(!user){
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up.' })
    }
    const eventId = req.params.id
    // Find the event by its ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

      // Check if the event belongs to the logged-in user
      if (!user.myEventsLink.includes(eventId)) {
        return res.status(403).json({ message: 'Forbidden. You are not allowed to delete this event' });
      }
    const firstname = user.firstname
    const ticketHoldersLength = event.purchasedTickets.length
    const EventName = event.eventName
    const EventDescription = event.eventDescription
    const EventDate = event.eventDate
    const EventTime = event.eventTime
    const EventVenue = event.eventVenue
    const eventImages = event.eventImages
    const link1 = `https://creativentstca.onrender.com/#/api/update/${eventId}`
    const link2 = `https://creativentstca.onrender.com/#/api/adminDashboard/allPending`
    const organiserEmail = user.email
    const availabletickets = event.availableTickets
    const data = {
      isToBeDeleted:true
    }
    await eventModel.findByIdAndUpdate(eventId,data,{new:true})

    sendEmail({
      email:user.email,
      subject:"Request to Delete Event Recieved",
      html:requestDeleteEmail(firstname,ticketHoldersLength,link1,EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages)
    })
    sendEmail({
      email:"creativentstca@gmail.com",
      subject:"User Requesting Event Delete",
      html: adminDelete(organiserEmail,availabletickets,ticketHoldersLength,link2,EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages) 
    })
    res.status(200).json({ message: 'Request successfully Sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error Requesting Event Delete', error: error.message });
  }
}




const getEventsByFollowing =  async (req,res) => {
  try {
    const user = await userModel.findById(req.userId).exec()
    if(!user){
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up.' })
    }
   
    const followingIds = user.following.map(usersFollowing => usersFollowing._id.toString());
    
// Use async/await for better readability
async function getUsersDetails(followingIds) {
  try {
      const follow = await userModel.find({ _id: { $in: followingIds } }); // Find users with matching IDs
      return follow; // Return the array of users details
  } catch (error) {
      console.error('Error fetching Users:', error);
      return []; // Return an empty array if there's an error
  }
}

 // Call the function and handle the result
const fulldetails =  await getUsersDetails(followingIds)

  // Extract email values from fulldetails array
  const events = fulldetails.map(item => item.myEventsLink);

const combinedArray = [].concat(...events);

// Use the $in operator to find documents with matching IDs
const eventsFollowing = await eventModel.find({ _id: { $in: combinedArray } });

res.status(200).json({ data: eventsFollowing });

  } catch (error) {
    res.status(500).json({ message: 'Error Getting Events', error: error.message });
  
  }
}


const requestPayout = async(req,res) => {
  try {
    const user = await userModel.findById(req.userId).exec()
    if(!user){
      return res.status(401).json({ message: 'User not authenticated. Please log in or sign up.' })
    }
    const eventId = req.params.id
    // Find the event by its ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

      // Check if the event belongs to the logged-in user
      if (!user.myEventsLink.includes(eventId)) {
        return res.status(403).json({ message: 'Forbidden. You are not allowed to delete this event' });
      }
    const firstname = user.firstname
    const ticketHoldersLength = event.purchasedTickets.length
    const EventName = event.eventName
    const EventDescription = event.eventDescription
    const EventDate = event.eventDate
    const EventTime = event.eventTime
    const EventVenue = event.eventVenue
    const eventImages = event.eventImages
    const link1 = `https://creativentstca.onrender.com/#/api/update/${eventId}`
    const link2 = `https://creativentstca.onrender.com/#/api/adminDashboard/allPending`
    const organiserEmail = user.email
    const availabletickets = event.availableTickets
    const data = {
      isToBeDeleted:true
    }
    await eventModel.findByIdAndUpdate(eventId,data,{new:true})

    sendEmail({
      email:user.email,
      subject:"Request to Delete Event Recieved",
      html:requestDeleteEmail(firstname,ticketHoldersLength,link1,EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages)
    })
    sendEmail({
      email:"creativentstca@gmail.com",
      subject:"User Requesting Event Delete",
      html: adminDelete(organiserEmail,availabletickets,ticketHoldersLength,link2,EventName, EventDescription,EventDate,EventTime,EventVenue,eventImages) 
    })
    res.status(200).json({ message: 'Request successfully Sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error Requesting Event Delete', error: error.message });
  }
}



module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  searchEvents,
  updateEventById,
  
  submitReview,
  getEventReviews,
  getUserWithLinks,
  promoteEvent,
  getPromotedEvents,
  bookmarkEvent,
  unbookmarkEvent,
  requestDelete,
  getEventsByFollowing
};
