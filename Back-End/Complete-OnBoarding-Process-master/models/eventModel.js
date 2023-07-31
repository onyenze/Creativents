const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    username :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    } ,
    eventPrice: {
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
    eventImages:{
        public_id: {
            type: String,
        },
        url:{ 
            type: String,
        }
    }
}, {timestamps: true});

const eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel