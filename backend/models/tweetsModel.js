const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: false
    },

    tweetImg: {
        type: String,
        required: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    creatorName : {
        type: String,
        required: true
    },

    creatorImg : {
        type: String,
        required: true
    },

    creatorUsername : {
        type: String,
        required: true
    },

    replying : {
        type : Boolean,
        required: false
    },

    replyingToUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: false
    },

    replyingToUsername : {
        type : 'String',
        required : false
    },

    replyingToTweetId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweets',
        required : false

    },

    likedBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : false
    }],

    replies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweets',
        required : false
    }]



}, {timestamps: true});

module.exports = mongoose.model('Tweets', tweetsSchema);