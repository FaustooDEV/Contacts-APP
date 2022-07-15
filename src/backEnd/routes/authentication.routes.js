const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAuthenticated, isNotAuthenticated } = require("../middlewares/Authentication");

// Register
router.get("/register", isNotAuthenticated, (req, res) => {
    res.render("authentication/register");
});

router.post("/register", passport.authenticate("local-register", {
    successRedirect: "/profile",
    failureRedirect: "/authentication/register",
    passReqToCallback: true,
    failureFlash: true
}));

// Login
router.get("/login", isNotAuthenticated, (req, res) => {
    res.render("authentication/login");
});

router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/authentication/login",
    passReqToCallback: true,
    failureFlash: true
}));

// Logout
router.get("/logout", isAuthenticated, (req, res) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect("/");
    });
});

module.exports = router;