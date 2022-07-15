const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const { handleHttpError } = require("../utils/handleError");
const { encryptPassword } = require("../utils/handlePassword");

/*----------------------------Users----------------------------*/

// Get all users
router.get("/users", async (req, res) => {

    try {
        const data = await User.find({});

        res.json(data);

    } catch (e) {
        handleHttpError(res, "ERROR_GET_USER");
    }

});

// Get one user
router.get("/users/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const data = await User.findById(id);

        res.json(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_A_USER");
    }

});

// Create user 
router.post("/users", async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const usernameFound = await User.findOne({ username: username });
        const emailFound = await User.findOne({ email: email });

        if (usernameFound || emailFound) {
            return handleHttpError(res, "ERROR_THE_USERNAME_OR_EMAIL_ALREADY_EXIST");
        }

        const hashPassword = await encryptPassword(password);

        const body = {
            username: username,
            email: email,
            password: hashPassword
        }

        await User.create(body);

        res.json({ status: "User created!" });

    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_USER", 403);
    }

})

// Update user
router.put("/users/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { username, email, password } = req.body;

        const body = {
            username: username,
            email: email,
            password: password
        }

        await User.findByIdAndUpdate(id, body);

        res.json({ status: "User updated!" });

    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_USER", 403);
    }
})

// Delete user
router.delete("/users/:id", async (req, res) => {

    try {

        const { id } = req.params;
        await User.findByIdAndDelete(id);

        res.json({ status: "User deleted!" });
    } catch (e) {
        handleHttpError(res, "ERROR_REMOVE_USER");
    }

})

/*----------------------------Contacts----------------------------*/

// Get all contacts
router.get("/contacts", async (req, res) => {

    try {
        const data = await Contact.find({});

        res.json(data);

    } catch (e) {
        handleHttpError(res, "ERROR_GET_CONTACT");
    }

});

// Get one contact
router.get("/contacts/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const data = await Contact.findById(id);

        res.json(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_A_CONTACT");
    }

});

// Create contact
router.post("/contacts/:authorID", async (req, res) => {

    try {
        const { authorID } = req.params;
        const { firstName, lastName, phoneNumber } = req.body;

        const body = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            author: authorID
        }

        await Contact.create(body);

        res.json({ status: "Contact created!" });

    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_CONTACT", 403);
    }

})

// Update contact
router.put("/contacts/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { firstName, lastName, phoneNumber } = req.body;

        const body = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        }

        await Contact.findByIdAndUpdate(id, body);

        res.json({ status: "Contact updated!" });

    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_CONTACT", 403);
    }
})

// Delete contact
router.delete("/contacts/:id", async (req, res) => {

    try {

        const { id } = req.params;
        await Contact.findByIdAndDelete(id);

        res.json({ status: "Contact deleted!" });
    } catch (e) {
        handleHttpError(res, "ERROR_REMOVE_CONTACT");
    }

})

module.exports = router;