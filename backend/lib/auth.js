require('dotenv').config();
const passport = require('passport');
const User = require('../models/userModel');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
    },
    function(accessToken, refreshToken, profile, cb) {
   
        User.findOne({email: profile.emails[0].value}).then(user => {
            if(user) {
      
                return cb(null , user, {message: "Logged in Successfully"});
            } 

            

            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                authMethod: 'google',

            });

            newUser.save().then(user => {
             
                return cb(null, user);
            }).catch(err => { console.log(err) })
        }).catch(err => { console.log(err) })
    }

));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: 'user:email',
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOne({email: profile.emails[0].value}).then(user => {
        if(user) {
  
            return cb(null , user, {message: "Logged in Successfully"});
        } 

        

        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            authMethod : 'github',

        });

        newUser.save().then(user => {
         
            return cb(null, user);
        }).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })
}
));





passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(_id, cb) {
    try{
        const user =await User.findById(_id);
        return cb(null, user);
    }
    catch(err){
        console.log(err);
        cb(err);
    }

});

module.exports = {
    initialize : passport.initialize(),
    session : passport.session()
}