const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');

require('dotenv').config({ path: __dirname + '/.env' })

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`,
    proxy: true
},
    async (request, accessToken, refreshToken, profile, done) => {

        const domain = profile._json.domain;
        const googleId = profile.id;
        const username = profile.displayName;
        const email = profile.email;

        if (domain && domain.includes(process.env.BITS_DOMAIN)) {

            const existingUser = await User.findOne({ googleId: googleId });

            if (existingUser) {

                done(null, existingUser);

            } else {

                const newUser = await User.create({ googleId, username, email });

                done(null, newUser);

            }

        } else {

            return done(new Error("Invalid host domain"), profile);

        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
