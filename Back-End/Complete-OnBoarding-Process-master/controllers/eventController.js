const cloudinary = require('../utilities/cloudinary')
const eventModel = require('../models/eventModel');


// Create a new event
const createEvent = async (req, res) => {
  try {
    const {username,eventDescription,eventName,eventVenue,eventDate,eventTime} = req.body
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
        eventVenue,
        eventDate,
        eventTime,
        images: imageUrls,
        public_id: publicIds})
    


    // save  the corresponding input into the database
    const savedEvent = await newEvent.save()

    

        // if (!req.files || req.files.length === 0) {
        //     return res.status(400).json({ error: "No event images added" });
        //   }
      
        //   // Delete the existing images from local upload folder and Cloudinary
        //   if (newEvent.eventImages && newEvent.eventImages.length > 0) {
        //     for (const imageUrl of newEvent.eventImages) {
        //       const publicId = imageUrl.split("/").pop().split(".")[0];
        //       console.log("publicId");
        //       await cloudinary.uploader.destroy(publicId);
        //     }
        //   } 
        //   const imageUrls = [];
        //   const uploadedFiles = req.files.files
        //   console.log(uploadedFiles);
        //   for (const file of uploadedFiles) {
        //     const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
        //       folder: 'eventImages',
        //     });
        //     imageUrls.push(uploadedImage.secure_url);
        //   }
      
        //   newEvent.set({
        //     username,eventDescription,eventName,eventVenue,eventDate,eventTime,
        //     eventImages: imageUrls,
        //   });
      
        //   await newEvent.save();
          

    


    res.status(201).json({ message: 'Event created successfully', data: savedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
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

// Update an event by ID
const updateEventById = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully', data: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
