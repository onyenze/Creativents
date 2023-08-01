const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'FirstName is Required']
    },
    LastName: {
        type: String,
        required: [true, 'LastName is Required']
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    DOB: {
        type:String
    },
    token: {
        type: String
    },
    profilePicture:{
        public_id: {
            type: String,
        },
        url:{ 
            type: String,
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    islogin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    myEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"event"
    }]
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel