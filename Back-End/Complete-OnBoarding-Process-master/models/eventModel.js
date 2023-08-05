const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    eventCategory: {
        type:String,
        // required: [true, 'eventCategory is Required']
    },
    eventPrice: {
        type: String
    },
    availableTickets: {
        type: Number
    },
    eventLocation: {
        type: String
    },
    eventDescription: {
        type: String,
        required: [true, 'eventDescription is Required']
    },
    eventName: {
        type: String,
        required: [true, 'eventName is Required']
    },
    eventVenue: {
        type: String,
        required: [true, 'eventVenue is Required']
    },
    eventDate: {
        type:String,
        required: [true, 'eventDate is Required']
    },
    eventTime: {
        type:String,
        required: [true, 'eventTime is Required']
    },
    purchasedTickets:[{
        type:mongoose.Schema.Types.ObjectId, ref: 'ticket'
    }],
    overallRating: { type: Number, default: 0 },
    reviews: [
      {
        attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        attendeeName: { type: String, required: true },
        rating: { type: Number, required: true },
        reviewText: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    eventImages:[{
        type:String
    }],
    public_id: [{
        type: String
    }]
}, {timestamps: true});

const eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel