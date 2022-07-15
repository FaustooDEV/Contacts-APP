const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/Authentication");
const { addContact, renderContacts, editContact, deleteContact } = require("../controllers/contacts.controller");
const contactModel = require("../models/Contact");
const { createContact, getID } = require("../validators/contactValidator");

//Render contacts
router.get("/", isAuthenticated, renderContacts);

//Add contact
router.get("/add", isAuthenticated, (req, res) => {

    const { username } = req.user;

    res.render("contacts/add", { add_Form: true, username });
});

router.post("/add", createContact, addContact);

//Update contact
router.get("/edit/:id", isAuthenticated, async (req, res) => {

    const { username } = req.user;
    const data = await contactModel.findById(req.params.id).lean();

    res.render("contacts/edit", { username, edit_Form: true, data: data });
});

router.post("/edit/:id", getID, createContact, editContact);

//Delete contact
router.get("/delete/:id", isAuthenticated, getID, deleteContact);

module.exports = router;