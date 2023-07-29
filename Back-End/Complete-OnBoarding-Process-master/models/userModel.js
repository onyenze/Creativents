const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'Username is Required']
    },
    LastName: {
        type: String,
        required: [true, 'Username is Required']
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
        type:String,
        required: [true, 'DOB is Required']
    },
    token: {
        type: String
    },
    isVerified: {
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
    isSuperAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel