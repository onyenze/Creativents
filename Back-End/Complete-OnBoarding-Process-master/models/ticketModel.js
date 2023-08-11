const mongoose = require('mongoose');

const ticketSchema =  new mongoose.Schema({
    email :{
        type:String,
        required: [true, 'email is Required']
    },
    ticketQuantity:{
        type:Number,
        required: [true, 'ticketQuantity is Required']
    },
    totalPrice:{
        type:Number,
    },
    isSoldOut:{
        type:Boolean,
        default:false
    },
    // ticketCode: { type: String, required: true },
    eventPrice: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },DOB: { type: String },
    eventDescription: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventName: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventVenue: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventDate: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventTime: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    eventImages:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
    },
    link: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'event'
   },
    saleDate: { type: Date, default: Date.now }
}, {timestamps: true});

const ticketModel = mongoose.model('ticket', ticketSchema);
module.exports = ticketModel