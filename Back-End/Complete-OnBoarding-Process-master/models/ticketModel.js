const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    email :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ticketQuantity:{
        type:Number,
        required: [true, 'ticketQuantity is Required']
    },
    eventPrice: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventDescription: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required: [true, 'eventDescription is Required']
    },
    eventName: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required: [true, 'eventName is Required']
    },
    eventVenue: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required: [true, 'eventVenue is Required']
    },
    eventDate: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required: [true, 'eventDate is Required']
    },
    eventTime: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required: [true, 'eventTime is Required']
    },
    eventImages:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
    }
}, {timestamps: true});

const ticketModel = mongoose.model('ticket', ticketSchema);
module.exports = ticketModel