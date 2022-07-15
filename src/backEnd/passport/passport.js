const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const { encryptPassword, comparePassword } = require("../utils/handlePassword");

// Passport to persist user information in the loggin session
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Register
passport.use("local-register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {

    const { username } = req.body;

    const usernameFound = await User.findOne({ username: username });
    const emailFound = await User.findOne({ email: email });

    //Verification if the credentials already exist
    if (usernameFound || emailFound) {
        return done(null, false, req.flash("AUTHENTICATION_MESSAGE", "The email or username was already taken"));
    } else {

        const hashPassword = await encryptPassword(password);

        const body = {
            username: username,
            email: email,
            password: hashPassword
        };

        const userCreated = await User.create(body);

        done(null, userCreated);
    }
}));

// Login
passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {

    const userFound = await User.findOne({ email: email });

    if (!userFound) {
        return done(null, false, req.flash("AUTHENTICATION_MESSAGE", "The user doesn't exist"));
    }

    const comparingPassword = await comparePassword(password, userFound.password);

    if (!comparingPassword) {
        return done(null, false, req.flash("AUTHENTICATION_MESSAGE", "The username or password are incorrect"));
    }

    done(null, userFound);
}));