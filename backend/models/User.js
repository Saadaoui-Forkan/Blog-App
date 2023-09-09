const mongoose = require("mongoose")

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
            publicId: null
        }
    },
    bio: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// User Model
const User = mongoose.model('User', UserSchema)

module.exports = User