const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: false
    },
    
    password: {
        type: String,
        required: false
    },

    authMethod: {
        type: String,
        required : true,
    },

    pfp : {
        type: String,
        required: false
    },

    coverImage : {
        type: String,
        required: false
    },

    activated: {
        type: Boolean,
        required: false
    },

    website: {
        type: String,
        required: false
    },

    bio: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    verified: {
        type: Boolean,
        required: false,
        default: false
    },


    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweets'
    }],

    followers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],

    following : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);