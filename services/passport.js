const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy: true
}, 
async (accessToken, refreshToken, profile, done) => {
    // console.log('access token', accessToken);
    // console.log('refresh token', refreshToken)
    // console.log('profile:', profile)

    const existingUser = await User.findOne({googleId: profile.id})
    
    if (existingUser) {
        //if user already exists then do not save
        return done(null, existingUser);
    }

    //if no recorded user with the same Id, then save new record of user.
    const user = await new User({ googleId: profile.id }).save()
    done(null, user)
    
})
);