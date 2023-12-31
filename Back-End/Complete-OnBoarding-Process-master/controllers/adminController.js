const userModel = require("../models/userModel");
const reportModel = require("../models/reportModel");
const eventModel = require("../models/eventModel")
const cloudinary = require('../utilities/cloudinary')
const {deletedEventMail} = require('../utilities/sendingmail/deletedEvent')
const {canceledTicket} = require('../utilities/sendingmail/canceledEvent')
const {sendEmail} = require('../middlewares/email')
const ticketModel = require("../models/ticketModel")


const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isEmail = await userModel.findOne({ email });
    if (isEmail) {
      res.status(400).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = await userModel.create({
        username,
        email: email.toLowerCase(),
        isAdmin: true,
        password: hash,
      });
      const token = await genToken(user._id, "30m");
      const subject = "New userModel";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const blockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: true ,
        isLogin:false,
        token:''
      },
      { new: true }
    );
    if (blockedUser) {
      res.status(200).json({ message: "user Blocked", blockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const unblockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (unblockedUser) {
      res.status(200).json({ message: "user Unblocked", unblockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await userModel.find({ isBlocked: true });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const allUsers = async (req, res) => {
  try {
      const users = await userModel.find({isAdmin: false})
      .populate("myEventsLink")
      .populate("myticketsLink")
      .populate('following')
      .populate('followers')
      .populate("bookmarks");
      if (users.length == 0) {
          res.status(404).json({
              message: ' No User not found'
          })
      } else {
          res.status(200).json({
              message: 'All Users found',
              data: users
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
};



const allLoginUsers = async (req, res)=>{
  try {

      const loginUsers = await userModel.find({islogin: true})
      if (loginUsers.length == 0) {
          res.status(404).json({
              message: 'No Login Users at the Moment'
          })
      } else {
          res.status(200).json({
              message: 'All Login Users',
              data: loginUsers
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
}




// Route to handle actions on reported items (e.g., delete, warn user, etc.)
// router.post('/admin/reports/:reportId', async (req, res) => {
//   try {
//     const reportId = req.params.reportId;
//     const action = req.body.action; // Example: 'delete', 'warn'
    
//     // Handle the action based on your business logic
//     // For example, you can delete the reported item, warn the user, etc.
    
//     // Update the report status (e.g., resolved, action taken)
//     const report = await reportModel.findByIdAndUpdate(reportId, { status: 'resolved', actionTaken: action });
    
//     res.json({ message: 'Action taken successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error taking action on report', error: error.message });
//   }
// });



// Get all reports
const getAllReports = async (req, res) => {
  try {
    const events = await reportModel.find()
    .populate("reporter")
    .populate("targetId")
    .exec();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get a report event by ID
const getReportById = async (req, res) => {
  try {
    const report = await reportModel.findById(req.params.id)
    .populate("reporter")
    .populate("targetId")
    .exec();
    
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
};


// Query search of events
const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    
    // Perform a case-insensitive search on event names and descriptions
    const searchResults = await userModel.find({
      $or: [
        { firstname: { $regex: searchTerm, $options: 'i' } },
        { lastname: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { userame: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    
    res.status(200).json({ data: searchResults });
  } catch (error) {
    res.status(500).json({ message: 'Error searching Users', error: error.message });
  }
};

// Deleting a User.
const deleteUser = async (req, res)=>{
  try {
      
          const deleteUser = await userModel.findByIdAndDelete(req.params.id);
          if(!deleteUser) {
              res.status(404).json({
                  message: 'User not found'
              });
          } else {
              res.status(200).json({
                  message: 'User deleted successfully',
                  data:deleteUser
              })
          }
      
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
}
// get all pending delete
const getAllEventsPendingDelete = async (req,res) => {
  try {
      // Find events with isToBeDeleted set to true
      const deletedEvents = await eventModel.find({ isToBeDeleted: true });

      res.status(200).json({ message: 'successful', data: deletedEvents });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
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

    const creatorId = eventToDelete.createdBy.toString()
    
    const creator = await userModel.findById(creatorId)
    if(!creator){
      return res.status(404).json({ message: `Creator of this Event does not exist`})
    }


    const ticketIds = eventToDelete.purchasedTickets.map(ticket => ticket._id.toString());
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

const organizersEmail = creator.email
// Loop through the emailArray and send email to each unique recipient
emailsToSend.forEach(email => {
  sendEmail({
    email,
    subject:"Event has been Cancelled",
    html : canceledTicket(eventToDelete.eventName, eventToDelete.eventDescription,eventToDelete.eventDate,eventToDelete.eventTime,eventToDelete.eventVenue,eventToDelete.eventImages,organizersEmail)
  });
});
const ticketHoldersLength = emailsToSend.length


sendEmail({
  email:creator.email,
  subject:"Event Deleted Sucessfully",
  html : deletedEventMail(ticketHoldersLength,eventToDelete.eventName,eventToDelete.eventDescription,eventToDelete.eventDate,eventToDelete.eventTime,eventToDelete.eventVenue,eventToDelete.eventImages) 
});


 // Extract the totalPrice and totalticketQuantity values from fulldetails array
const totalPriceArray = fulldetails.map(item => item.totalPrice);
const totalQuantityArray = fulldetails.map(item => item.ticketQuantity);
 
// calculate the sum of the array
const priceSum = totalPriceArray.reduce((initial, price) => initial + price, 0);
const quantitySum = totalQuantityArray.reduce((initial, quantity) => initial + quantity, 0);

// subtract the ticket Quantity and total price and from the array
creator.Earnings -= parseFloat(priceSum)
creator.totalTicketsSold -= parseFloat(quantitySum)


 // Delete event images from Cloudinary
 if (eventToDelete.public_id && eventToDelete.public_id.length > 0) {
  for (const publicId of eventToDelete.public_id) {
    await cloudinary.uploader.destroy(publicId);
  }
}

// Delete the event from the database
const deletedEvent = await eventModel.findByIdAndDelete(eventID);

// Remove the event from the user's myEventsLink array
creator.myEventsLink.pull(eventID);

    await creator.save();


    res.status(200).json({ message: 'Event deleted successfully', data: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};


const getUserById = async (req,res) => {
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
    throw new Error('Error fetching user with linked fields: ' + error.message);
  }
};



const deleteEventReview = async (req, res) => {
  const eventId = req.params.eventID;
  const reviewId = req.params.reviewID; // Assuming you have a way to identify the review to delete

  try {
      // Find the event in the database
      const event = await eventModel.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Find the review to delete by reviewId
      const reviewToDelete = event.reviews.find((review) => review._id.toString() === reviewId);

      if (!reviewToDelete) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Remove the review from the event's reviews array
      event.reviews = event.reviews.filter((review) => review._id.toString() !== reviewId);

      // Calculate the updated overall rating
      const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0);
      event.overallRating = event.reviews.length === 0 ? 0 : totalRating / event.reviews.length;

      // Save the updated event data
      await event.save();

      res.status(200).json({
        data: event.reviews,
        overallRating: event.overallRating,
        message: 'Review deleted successfully',
      });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review: ' + error.message });
  }
};



module.exports = {
  blockUser,
  unblockUser,
  getAllBlockedUsers,
  signupAdmin,
  allUsers,
  allLoginUsers,
  searchUsers,
  getReportById,
  getAllReports,
  getAllEventsPendingDelete,
  deleteEventById,
  deleteUser,
  getUserById,
  deleteEventReview
};